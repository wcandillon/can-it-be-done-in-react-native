import React from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { polar2Canvas } from "react-native-redash";
import Svg, { Defs, Mask, Path } from "react-native-svg";

import { SIZE, STROKE, R, TAU, PI, CENTER, arc } from "./Constants";
import Cursor from "./Cursor";
import Gesture from "./Gesture";
import Quadrant from "./components/Quadrant";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface CircularProps {
  start: Animated.SharedValue<number>;
  end: Animated.SharedValue<number>;
}

const CircularSlider = ({ start, end }: CircularProps) => {
  const startPos = useDerivedValue(() => {
    const vec = polar2Canvas({ theta: start.value, radius: R }, CENTER);
    return { x: vec.x, y: vec.y };
  });
  const endPos = useDerivedValue(() => {
    const vec = polar2Canvas({ theta: end.value, radius: R }, CENTER);
    return { x: vec.x, y: vec.y };
  });
  const animatedProps = useAnimatedProps(() => {
    const { x: x0, y: y0 } = startPos.value;
    const { x: x1, y: y1 } = endPos.value;
    const duration =
      start.value > end.value
        ? end.value + (TAU - start.value)
        : end.value - start.value;
    return {
      d: `M ${x0} ${y0} ${arc(x1, y1, duration > PI)}`,
    };
  });
  return (
    <View>
      <Svg width={SIZE} height={SIZE}>
        <Defs>
          <Mask id="mask">
            <AnimatedPath
              stroke="#FD9F07"
              strokeWidth={STROKE}
              animatedProps={animatedProps}
            />
          </Mask>
        </Defs>
        <Quadrant />
        <Cursor theta={start} />
        <Cursor theta={end} />
      </Svg>
      <Gesture start={start} end={end} startPos={startPos} endPos={endPos} />
    </View>
  );
};

export default CircularSlider;
