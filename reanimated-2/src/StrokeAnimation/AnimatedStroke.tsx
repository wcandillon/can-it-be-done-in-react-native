import React, { useRef, useState } from "react";
import Animated, { Easing, useAnimatedProps } from "react-native-reanimated";
import { Path } from "react-native-svg";

interface AnimatedStrokeProps {
  d: string;
  progress: Animated.SharedValue<number>;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);
const colors = ["#FFC27A", "#7EDAB9", "#45A6E5", "#FE8777"];

const AnimatedStroke = ({ d, progress }: AnimatedStrokeProps) => {
  const stroke = colors[Math.round(Math.random() * (colors.length - 1))];
  const [length, setLength] = useState(0);
  const ref = useRef<Path>(null);
  const animatedBGProps = useAnimatedProps(() => ({
    strokeDashoffset:
      length - length * Easing.bezier(0.61, 1, 0.88, 1)(progress.value),
    fillOpacity: progress.value,
  }));
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset:
      length - length * Easing.bezier(0.37, 0, 0.63, 1)(progress.value),
  }));
  return (
    <>
      <AnimatedPath
        animatedProps={animatedBGProps}
        d={d}
        stroke={stroke}
        strokeWidth={10}
        fill="white"
        strokeDasharray={length}
      />
      <AnimatedPath
        animatedProps={animatedProps}
        onLayout={() => setLength(ref.current!.getTotalLength())}
        ref={ref}
        d={d}
        stroke="black"
        strokeWidth={10}
        strokeDasharray={length}
      />
    </>
  );
};

export default AnimatedStroke;
