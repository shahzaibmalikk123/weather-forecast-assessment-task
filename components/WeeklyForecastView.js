import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import { theme } from "../theme";
import { weatherImages } from "../constants";
import icons from "../constants/icons";

const WeeklyForecastView = ({ forecastData, currentCondition }) => {
    const itemCount = forecastData?.forecastday?.length || 0;
    return (
        <View
            style={[
                styles.days,
                currentCondition === "Overcast" && {
                    backgroundColor: theme.bgBlack(0.8),
                },

                currentCondition === "Partly cloudy" && {
                    backgroundColor: theme.bgBlack(0.8),
                },
                currentCondition === "Mist" && {
                    backgroundColor: theme.bgDustyRose(0.8),
                },
                currentCondition === "Fog" && {
                    backgroundColor: theme.bgDustyRose(0.8),
                },
            ]}
        >
            <View
                style={{
                    height: "20%",
                    justifyContent: "space-between",
                    flexDirection: "row",
                }}
            >
                <Text
                    style={{ color: "white", fontWeight: "bold", fontSize: 18 }}
                >
                    Coming Week Forecast
                </Text>
                <Image source={icons.calendar} />
            </View>

            <ScrollView
                style={{ borderRadius: 20 }}
                showsVerticalScrollIndicator={false}
            >
                {forecastData?.forecastday?.map((item, index) => {
                    let date = new Date(item.date);
                    let options = { weekday: "long" };
                    let dayName = date.toLocaleDateString("en-US", options);
                    dayName = dayName.split(",")[0];

                    return (
                        <View
                            key={index}
                            style={[
                                styles.days_forecast,
                                index !==
                                    forecastData.forecastday.length - 1 && {
                                    borderBottomWidth: 0.2,
                                    borderColor: "white",
                                },
                                index === 0 && {
                                    borderTopLeftRadius: 20,
                                    borderTopRightRadius: 20,
                                }, // Apply different border radius to the first item
                                index === itemCount - 1 && {
                                    borderBottomLeftRadius: 20,
                                    borderBottomRightRadius: 20,
                                }, // Apply different border radius to the last item
                            ]}
                        >
                            <Image
                                style={{ height: 20, width: 20 }}
                                source={
                                    weatherImages[item?.day?.condition?.text] ||
                                    require("../assets/icons/partlycloudy.png")
                                }
                            />
                            <Text style={{ color: "white" }}>{dayName}</Text>
                            <Text style={{ color: "white" }}>
                                {item?.day?.avgtemp_c}&#176;
                            </Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
};

export const styles = {
    days: {
        //height: 300,
        height: "43%",
        //backgroundColor: "lightblue",
        backgroundColor: theme.bgBlack(0.7),
        padding: 15,
        borderRadius: 25,
    },
    scrollview: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 0,
        width: 80,
        marginVertical: 0,
        marginLeft: 0,
        backgroundColor: theme.bgWhite(0.3),
        borderRadius: 20,
        marginHorizontal: 10,
    },
    days_forecast: {
        height: 40,
        paddingVertical: 10,
        justifyContent: "space-between",
        flexDirection: "row",
        backgroundColor: theme.bgWhite(0.3),
        paddingHorizontal: 8,
    },
    loader: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
};

export default WeeklyForecastView;
