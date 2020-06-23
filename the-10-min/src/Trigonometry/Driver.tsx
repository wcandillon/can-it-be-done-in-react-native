import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { sub } from "react-native-reanimated";
import { polar2Canvas } from "react-native-redash";

const styles = StyleSheet.create({
  circle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "cyan",
    borderColor: "black",
    borderWidth: 3,
  },
});

interface DriverProps {
  radius: number;
  angle: Animated.Node<number>;
}

const Driver = ({ angle, radius }: DriverProps) => {
  const { x, y } = polar2Canvas(
    { theta: angle, radius },
    { x: radius, y: radius }
  );
  return (
    <View style={StyleSheet.absoluteFill}>
      <Animated.View
        style={[
          styles.circle,
          {
            transform: [{ translateX: sub(x, 25) }, { translateY: sub(y, 25) }],
          },
        ]}
      />
    </View>
  );
};

export default Driver;
