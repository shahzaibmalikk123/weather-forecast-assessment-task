import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";
import { theme } from "../theme";
import { weatherAnimations } from "../constants/animations";
import icons from "../constants/icons";

const DesiredForecastView = ({ current, location, currentCondition }) => {
    return (
        <View style={{ height: "40%" }}>
            <View style={styles.forecast_img}>
                <View style={styles.animationContainer}>
                    <LottieView
                        style={styles.img2}
                        source={
                            weatherAnimations[current?.condition?.text] ||
                            require("../assets/animations/partlycloudyy.json")
                        }
                        autoPlay
                        loop
                        resizeMode="contain"
                    />
                </View>
            </View>
            <Text
                numberOfLines={1}
                style={[
                    styles.text2,
                    currentCondition === "Sunny" && {
                        color: "#333333",
                    },
                ]}
            >
                {location?.name},
                <Text
                    style={[
                        styles.text3,
                        currentCondition === "Sunny" && {
                            color: "#333333",
                        },
                    ]}
                >
                    {" " + location?.country}
                </Text>
            </Text>
            <View style={styles.temp}>
                <Text
                    style={[
                        styles.text4,
                        currentCondition === "Sunny" && {
                            color: "#333333",
                        },
                    ]}
                >
                    {current?.temp_c}&#176;
                </Text>
                <Text
                    style={[
                        styles.info_text,
                        currentCondition === "Sunny" && {
                            color: "#333333",
                        },
                    ]}
                >
                    {current?.condition?.text}
                </Text>
            </View>
            {/* <Text style={styles.date}>{extractDateAndTime(location?.localtime)?.date}</Text> */}
            <View style={styles.under_condition}>
                <View
                    style={[
                        styles.situations,

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
                    <View style={styles.situation_view}>
                        <View style={{ height: "50%", width: "35%" }}>
                            <Image
                                resizeMode="contain"
                                source={icons.humidity}
                                style={{ height: "100%", width: "100%" }}
                            />
                        </View>
                        <Text style={{ marginLeft: 3, color: "white" }}>
                            {current?.humidity}%
                        </Text>
                    </View>
                    <View style={styles.situation_view}>
                        <View style={{ height: "50%", width: "35%" }}>
                            <Image
                                resizeMode="contain"
                                source={icons.clouds}
                                style={{ height: "100%", width: "100%" }}
                            />
                        </View>
                        <Text style={{ marginLeft: 3, color: "white" }}>
                            {current?.cloud}%
                        </Text>
                    </View>
                    <View style={styles.situation_view}>
                        <View style={{ height: "50%", width: "35%" }}>
                            <Image
                                resizeMode="contain"
                                source={icons.wind}
                                style={{ height: "100%", width: "100%" }}
                            />
                        </View>
                        <Text style={{ marginLeft: 3, color: "white" }}>
                            {current?.wind_kph} km/h
                        </Text>
                    </View>
                </View>
            </View>
        </View>
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
    },
    search_view: {
        height: "7%",
        marginHorizontal: 20,
        zIndex: 50,
    },
    inside_search: {
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
        backgroundColor: theme.bgWhite(0.2),
        flex: 1,
        borderRadius: 25,
        padding: 3,
    },
    input: {
        paddingLeft: 6,
        flex: 1,
        color: "white",
    },
    button: {
        backgroundColor: theme.bgWhite(0.3),
        padding: 3,
        width: "12%",
        height: "100%",
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },
    inactive: {
        backgroundColor: "transparent",
    },
    under_search: {
        position: "absolute",
        width: "100%",
        backgroundColor: "white",
        marginTop: "15%",
        borderRadius: 25,
    },
    button2: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        paddingHorizontal: 12,
        marginBottom: 5,
    },
    text: {
        fontSize: 16,
        marginLeft: 4,
    },
    forecast: {
        height: "100%",
        marginHorizontal: 10,
        flexDirection: "column",
    },
    text2: {
        textAlign: "center",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 30,
        marginTop: "2%",
    },
    text3: {
        color: "white",
        fontWeight: "400",
        fontSize: 22,
    },
    date: {
        color: "white",
        fontWeight: "500",
        fontSize: 20,
        textAlign: "center",
    },
    forecast_img: {
        justifyContent: "center",
        flexDirection: "row",
        height: "35%",
        width: "100%",
        alignItems: "center",
    },
    animationContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    img2: {
        flex: 1,
        height: "100%",
        width: "100%",
    },
    temp: {
        padding: 2,
    },
    text4: {
        textAlign: "center",
        color: "white",
        fontWeight: "bold",
        fontSize: 50,
    },
    info_text: {
        textAlign: "center",
        color: "white",
        fontSize: 20,
        letterSpacing: 1,
    },
    under_condition: {
        height: "14%",
        paddingHorizontal: 10,
        marginTop: "3%",
    },
    situations: {
        height: "100%",
        width: "100%",
        backgroundColor: theme.bgBlack(0.7),
        borderRadius: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 15,
    },
    situation_view: {
        flexDirection: "row",
        height: "100%",
        width: "30%",
        alignItems: "center",
    },
});
export default DesiredForecastView;
