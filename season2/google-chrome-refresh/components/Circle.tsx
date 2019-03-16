import * as React from "react";
import { View } from "react-native";
import { DangerZone } from "expo";

const { Animated } = DangerZone;
const { Value, interpolate, Extrapolate } = Animated;

interface CircleProps {
  size: number;
  x: Value;
  inputRange: [number, number];
  outputRange: [number, number];
}

export default class Circle extends React.PureComponent<CircleProps> {
  render() {
    const {
      size, inputRange, outputRange, x,
    } = this.props;
    const translateX = interpolate(x, {
      inputRange,
      outputRange,
      extrapolate: Extrapolate.CLAMP,
    });
    const style = {
      height: size * 2,
      width: size * 2,
      borderRadius: size,
      backgroundColor: "#656667",
      transform: [{ translateX }],
    };
    return (
      <Animated.View {...{ style }} />
    );
  }
}
