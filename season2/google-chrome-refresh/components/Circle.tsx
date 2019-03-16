import * as React from "react";
import { View } from "react-native";
import { DangerZone, Svg } from "expo";
import SVGPath from "art/modes/svg/path";

const { Animated } = DangerZone;
const { Value, interpolate, Extrapolate } = Animated;
const { Path } = Svg;

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
    const d = SVGPath()
      .moveTo(size, 0)
      .arcTo(size * 2, size, size)
      .arcTo(size, size * 2, size)
      .arcTo(0, size, size)
      .arcTo(size, 0)
      .toSVG();
    return (
      <Animated.View style={{ transform: [{ translateX }] }}>
        <Svg width={size * 2} height={size * 2}>
          <Path fill="#656667" {...{ d }} />
        </Svg>
      </Animated.View>
    );
  }
}
