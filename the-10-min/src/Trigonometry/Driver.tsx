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
  theta: Animated.Node<number>;
}

const Driver = ({ theta, radius }: DriverProps) => {
  const { x, y } = polar2Canvas({ theta, radius }, { x: radius, y: radius });
  return (
    <View style={[StyleSheet.absoluteFill, { zIndex: 200 }]}>
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
