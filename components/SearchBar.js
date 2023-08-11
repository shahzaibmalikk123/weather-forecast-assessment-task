import React from "react";
import { View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { MapPinIcon } from "react-native-heroicons/solid";
import { theme } from "../theme";

const SearchBar = ({
    showSearch,
    setShowSearch,
    handleDelayText,
    locations,
    locationHandler,
}) => {
    return (
        <View style={styles.search_view}>
            <View
                style={[styles.inside_search, !showSearch && styles.inactive]}
            >
                {showSearch ? (
                    <TextInput
                        onChangeText={handleDelayText}
                        placeholder="Search City"
                        placeholderTextColor={"white"}
                        style={styles.input}
                    />
                ) : null}
                <Pressable
                    onPress={() => setShowSearch(!showSearch)}
                    style={styles.button}
                >
                    <MagnifyingGlassIcon size={25} color="white" />
                </Pressable>
            </View>
            {locations.length > 0 && showSearch ? (
                <View style={styles.under_search}>
                    {locations.map((loc, index) => {
                        let showBorder = index + 1 !== locations.length;
                        let borderClass = showBorder
                            ? {
                                  borderBottomColor: "grey",
                                  borderBottomWidth: 1,
                              }
                            : {};
                        return (
                            <Pressable
                                key={index}
                                style={[styles.button2, borderClass]}
                                onPress={() => locationHandler(loc)}
                            >
                                <MapPinIcon size={20} color="grey" />
                                <Text style={styles.text}>
                                    {loc?.name}, {loc?.country}
                                </Text>
                            </Pressable>
                        );
                    })}
                </View>
            ) : null}
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
        backgroundColor: theme.bgBlack(0.2),
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
        borderRadius: 30,
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

    daily_forecast: {
        height: "60%",
        marginHorizontal: 5,
        borderRadius: 0,
        paddingBottom: 10,
    },
});
export default SearchBar;
