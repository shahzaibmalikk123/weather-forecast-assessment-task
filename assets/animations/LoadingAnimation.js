import React from "react";
import { View,Text } from "react-native";
import LottieView from "lottie-react-native";

const LoadingAnimation = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{fontWeight:'bold',fontSize:20}}>Fetching your location...</Text>
      <LottieView
        source={require("./loader.json")} // Replace with the path to your Lottie animation file
        autoPlay
        loop
        style={{ width: 100, height: 100 }}
      />
    </View>
  );
};

export default LoadingAnimation;
