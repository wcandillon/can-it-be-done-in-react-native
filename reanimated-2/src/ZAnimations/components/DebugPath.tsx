import React from "react";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { Path } from "react-native-redash";
import { Circle, Line } from "react-native-svg";

interface DebugPathProps {
  path: Animated.SharedValue<Path>;
  index: number;
  stroke: string;
  strokeWidth: number;
}

const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const DebugPath = ({ path, index, stroke, strokeWidth }: DebugPathProps) => {
  const points = useDerivedValue(() => {
    const curve = path.value.curves[index];
    const from = index > 0 ? curve.to : path.value.move;
    return {
      from,
      c1: curve.c1,
      c2: curve.c2,
      to: curve.to,
    };
  });
  const line1 = useAnimatedProps(() => ({
    x1: points.value.from.x,
    y1: points.value.from.y,
    x2: points.value.c1.x,
    y2: points.value.c1.y,
  }));
  const line2 = useAnimatedProps(() => ({
    x1: points.value.c1.x,
    y1: points.value.c1.y,
    x2: points.value.c2.x,
    y2: points.value.c2.y,
  }));
  const line3 = useAnimatedProps(() => ({
    x1: points.value.c2.x,
    y1: points.value.c2.y,
    x2: points.value.to.x,
    y2: points.value.to.y,
  }));
  const circle1 = useAnimatedProps(() => ({
    cx: points.value.c1.x,
    cy: points.value.c1.y,
  }));
  const circle2 = useAnimatedProps(() => ({
    cx: points.value.c2.x,
    cy: points.value.c2.y,
  }));
  return (
    <>
      <AnimatedLine animatedProps={line1} stroke={stroke} strokeWidth={1} />
      <AnimatedLine animatedProps={line2} stroke={stroke} strokeWidth={1} />
      <AnimatedLine animatedProps={line3} stroke={stroke} strokeWidth={1} />
      <AnimatedCircle
        animatedProps={circle1}
        r={strokeWidth / 2}
        fill={stroke}
      />
      <AnimatedCircle
        animatedProps={circle2}
        r={strokeWidth / 2}
        fill={stroke}
      />
    </>
  );
};

export default DebugPath;
