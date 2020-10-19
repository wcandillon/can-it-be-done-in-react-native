import React, { useEffect, useMemo, useRef, useState } from "react";
import Animated, { useAnimatedProps, Easing } from "react-native-reanimated";
import { parse, serialize } from "react-native-redash";
import { Path } from "react-native-svg";

const colors = ["#FFC27A", "#7EDAB9", "#45A6E5", "#FE8777"];

interface AnimatedStrokeProps {
  d: string;
  progress: Animated.SharedValue<number>;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedStroke = ({ d, progress }: AnimatedStrokeProps) => {
  const color = colors[Math.round(Math.random() * colors.length)];
  const ref = useRef<typeof AnimatedPath>(null);
  const [length, setLength] = useState(0);
  const animatedProps1 = useAnimatedProps(() => ({
    strokeDashoffset: length - length * Easing.bezier(0.61, 1, 0.88, 1)(progress.value),
  }));
  const animatedProps2 = useAnimatedProps(() => ({
    strokeDashoffset: length - length * Easing.bezier(0.37, 0, 0.63, 1)(progress.value),
  }));
  return (
    <>
      <AnimatedPath
        ref={ref}
        animatedProps={animatedProps1}
        d={d}
        stroke={color}
        strokeWidth={10}
        strokeDasharray={length}
      />
      <AnimatedPath
        ref={ref}
        onLayout={() => setLength(ref.current.getTotalLength)}
        animatedProps={animatedProps2}
        d={d}
        stroke="black"
        strokeWidth={10}
        strokeDasharray={length}
      />
    </>
  );
};

export default AnimatedStroke;
