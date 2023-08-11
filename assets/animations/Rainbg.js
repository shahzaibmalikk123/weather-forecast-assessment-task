import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const Rainbg = () => {
  return (
    <View style={styles.animationContainer}>
      <LottieView
        source={require("../animations/rainbg.json")}
        autoPlay
        loop
      />
    </View>
  );
};

const styles = StyleSheet.create({
  animationContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
});

export default Rainbg;
