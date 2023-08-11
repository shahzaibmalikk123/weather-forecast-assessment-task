import { View, Image, StyleSheet, SafeAreaView, Platform } from "react-native";

import * as Location from "expo-location";

import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { fetchLocation, fetchWeatherForecast } from "../API/forecast";
import { extractDateAndTime } from "../functions/DateUtils";
import { weatherImagesbg } from "../constants/bgImages";
import DesiredForecastView from "../components/DesiredForcastView";
import DaywiseForecastView from "../components/DaywiseForcastView";
import WeeklyForecastView from "../components/WeeklyForecastView";
import SearchBar from "../components/SearchBar";
import LoadingAnimation from "../assets/animations/LoadingAnimation";

const HomeScreen = () => {
    const [showSearch, setShowSearch] = useState(false);
    const [locations, setLocations] = useState([]);
    const [weather, setWeather] = useState({});
    const [currentHourIndex, setCurrentHourIndex] = useState(0);
    const [cityNameLoading, setCityNameLoading] = useState(true);

    const locationHandler = (loc) => {
        setLocations([]);
        setShowSearch(false);
        fetchWeatherForecast({
            cityName: loc.name,
            days: "7",
        }).then((data) => {
            setWeather(data);
        });
    };

    const searchHandler = (value) => {
        if (value.length > 2) {
            fetchLocation({ cityName: value }).then((data) => {
                setLocations(data);
            });
        }
    };
    const handleDelayText = useCallback(debounce(searchHandler, 100), []);

    const { current, location } = weather;

    const getUserCity = async (latitude, longitude) => {
        try {
            const baseUrl = "https://nominatim.openstreetmap.org/reverse";
            const format = "json";
            const language = "en";
            const response = await fetch(
                `${baseUrl}?format=${format}&lat=${latitude}&lon=${longitude}&accept-language=${language}`
            );
            const data = await response.json();

            const cityName =
                data.address.city ||
                data.address.town ||
                data.address.village ||
                "City Not Found";

            // Fetch weather data using the fetched cityName
            fetchWeatherForecast({
                cityName: cityName,
                days: "7",
                latitude: latitude,
                longitude: longitude,
            }).then((res) => {
                setWeather(res);
            });
        } catch (error) {
            console.error(error);
        }
    };

    const defaultWeatherForecast = async () => {
        try {
            const { status } =
                await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                const defaultLatitude = -37.8136;
                const defaultLongitude = 144.9631;
                await getUserCity(defaultLatitude, defaultLongitude);
                return;
            }
            const locationInfo = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = locationInfo.coords;
            await getUserCity(latitude, longitude);
            // Fetch weather data using the fetched cityName
        } catch (error) {
            console.error("Error fetching weather data:", error);
        }
    };

    const fetchDataAndSetCurrentHourIndex = async () => {
        await defaultWeatherForecast();
        const currentDate = new Date();
        const currentHour = currentDate.getHours();
        const hourlyForecast = weather?.forecast?.forecastday?.[0]?.hour;

        if (hourlyForecast) {
            const startIndex = hourlyForecast.findIndex((hour) => {
                const hourTime = parseInt(
                    hour.time.split(" ")[1].split(":")[0]
                );
                return hourTime >= currentHour;
            });
            setCurrentHourIndex(startIndex);
        }
    };

    useEffect(() => {
        // Fetch user's current location and weather forecast
        defaultWeatherForecast().then(() => {
            fetchDataAndSetCurrentHourIndex(); // Fetch current hour index after weather data is fetched
            setCityNameLoading(false);
        });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Image
                source={
                    weatherImagesbg[current?.condition?.text] ||
                    require("../assets/images/clouds.jpg")
                }
                style={styles.img}
            />

            <SafeAreaView style={styles.main}>
                {/* This is the section where user can tap the search icon and enter any city name for weather forecast.*/}
                <SearchBar
                    showSearch={showSearch}
                    setShowSearch={setShowSearch}
                    handleDelayText={handleDelayText}
                    locations={locations}
                    locationHandler={locationHandler}
                />

                {cityNameLoading ? (
                    <LoadingAnimation />
                ) : (
                    <View style={styles.forecast}>
                        {/* This is the section where user can see the temperature,cityName and the type of weather. */}
                        <DesiredForecastView
                            current={current}
                            location={location}
                            currentHourIndex={currentHourIndex}
                            currentCondition={current?.condition?.text}
                        />
                        <View style={{ height: "2%" }}></View>
                        {/* In this section the horly forecast of the present day will be shown here. */}
                        <View
                            style={styles.daily_forecast}
                            showsVerticalScrollIndicator={false}
                        >
                            <DaywiseForecastView
                                key={currentHourIndex}
                                forecastData={weather?.forecast}
                                currentHourIndex={currentHourIndex}
                                extractDateAndTime={extractDateAndTime}
                                location={location}
                                weather={weather}
                                currentCondition={current?.condition?.text}
                            />

                            <View style={{ height: "2%" }}></View>
                            {/* In this section, the forcast of next seven days will be displayed here. */}
                            <WeeklyForecastView
                                forecastData={weather?.forecast}
                                currentCondition={current?.condition?.text}
                            />
                        </View>
                    </View>
                )}
            </SafeAreaView>
        </SafeAreaView>
    );
};

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    img: {
        position: "absolute",
        height: "120%",
        width: "100%",
    },
    main: {
        flex: 1,
        marginTop: Platform.OS === "ios" ? 0 : 30,
    },
    forecast: {
        height: "100%",
        marginHorizontal: 10,
        flexDirection: "column",
    },
    daily_forecast: {
        height: "60%",
        marginHorizontal: 5,
        borderRadius: 0,
        paddingBottom: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
});

export default HomeScreen;
