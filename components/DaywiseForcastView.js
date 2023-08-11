import React from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { theme } from "../theme";
import { weatherImages } from "../constants";

const DaywiseForecastView = ({
    currentHourIndex,
    extractDateAndTime,
    location,
    weather,
    currentCondition,
}) => {
    return (
        <View
            style={[
                styles.main,

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
                    Today
                </Text>
                <Text style={{ color: "white" }}>
                    {extractDateAndTime(location?.localtime)?.date}
                </Text>
            </View>
            <ScrollView
                horizontal
                contentContainerStyle={{ paddingHorizontal: 0 }}
                showsHorizontalScrollIndicator={false}
            >
                {weather?.forecast?.forecastday?.[0]?.hour
                    ?.slice(currentHourIndex)
                    ?.map((hour, hourIndex) => {
                        let time = hour.time.split(" ")[1];
                        return (
                            <View
                                key={hourIndex}
                                style={[
                                    styles.scrollview,
                                    currentHourIndex === hourIndex &&
                                        styles.currentHourView,
                                ]}
                            >
                                <Image
                                    source={
                                        weatherImages[hour?.condition?.text] ||
                                        require("../assets/icons/partlycloudy.png")
                                    }
                                    style={{
                                        marginBottom: 10,
                                        height: 25,
                                        width: 25,
                                    }}
                                />
                                <Text
                                    style={{
                                        paddingTop: 0,
                                        color: "white",
                                        textAlign: "center",
                                        marginBottom: 10,
                                    }}
                                >
                                    {time}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: 18,
                                        paddingTop: 2,
                                        color: "white",
                                        fontWeight: "600",
                                    }}
                                >
                                    {hour?.temp_c}&#176;
                                </Text>
                            </View>
                        );
                    })}
            </ScrollView>
        </View>
    );
};

export const styles = StyleSheet.create({
    main: {
        height: "40%",
        width: "100%",
        padding: 15,
        borderRadius: 25,
        //backgroundColor: theme.bgBlack(0.5),
        backgroundColor: theme.bgBlack(0.7),
    },
    weekly: {
        height: "100%",
        width: "10%",
        alignItems: "center",
        justifyContent: "center",
    },
    days: {
        //height: 300,
        height: "43%",
        //backgroundColor: "lightblue",
        backgroundColor: theme.bgBlack(0.5),
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
    currentHourView: {},
    days_forecast: {
        height: 40,
        paddingVertical: 5,
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
    // currentHourView:{
    //   backgroundColor:'blue'
    // }
});

export default DaywiseForecastView;
