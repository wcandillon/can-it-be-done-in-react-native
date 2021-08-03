import React from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import Svg, { Path } from "react-native-svg";
const { width, height } = Dimensions.get("window");

const R = 50;

const RotaryLogin = () => {
  const d = [
    `M ${0} ${0}`,
    `h ${200}`,
    `v ${200}`,
    `L ${100} ${100}`,
    `A ${R} ${R} 0 0 0 ${150} ${50}`,
    `A ${R} ${R} 0 0 0 ${100} ${0}`,
    `A ${R} ${R} 0 0 0 ${50} ${50}`,
    `A ${R} ${R} 0 0 0 ${100} ${100}`,
    `L ${200} ${200}`,
    `H ${0}`,
    `V ${0}`,
  ].join("");
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "red",
      }}
    >
      <Text style={{ fontSize: 256, color: "white" }}>42</Text>
      <Svg style={StyleSheet.absoluteFill}>
        <Path d={d} fill="black" />
      </Svg>
    </View>
  );
};

export default RotaryLogin;
