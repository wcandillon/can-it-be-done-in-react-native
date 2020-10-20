import React, { useRef, useState } from "react";
import Animated, {
  useAnimatedProps,
  Easing,
  useDerivedValue,
} from "react-native-reanimated";
import { mix } from "react-native-redash";
import { Path } from "react-native-svg";

const colors = ["#FFC27A", "#7EDAB9", "#45A6E5", "#FE8777"];

interface AnimatedStrokeProps {
  d: string;
  progress: Animated.SharedValue<number>;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedStroke = ({ d, progress: rawProgress }: AnimatedStrokeProps) => {
  const color = colors[Math.round(Math.random() * colors.length)];
  const offset = Math.random() * 0.5;
  const sign = Math.round(Math.random()) ? -1 : 1;
  const progress = useDerivedValue(() =>
    Math.max(mix(rawProgress.value, sign * offset, 1), 0)
  );
  const ref = useRef<typeof AnimatedPath>(null);
  const [length, setLength] = useState(0);
  const animatedProps1 = useAnimatedProps(() => ({
    strokeDashoffset:
      length - length * Easing.bezier(0.61, 1, 0.88, 1)(progress.value),
  }));
  const animatedProps2 = useAnimatedProps(() => ({
    fillOpacity: progress.value,
    strokeDashoffset:
      length - length * Easing.bezier(0.37, 0, 0.63, 1)(progress.value),
  }));
  return (
    <>
      <AnimatedPath
        ref={ref}
        animatedProps={animatedProps1}
        d={d}
        stroke={color}
        strokeWidth={8}
        strokeDasharray={length}
      />
      <AnimatedPath
        ref={ref}
        onLayout={() => setLength(ref.current.getTotalLength())}
        animatedProps={animatedProps2}
        d={d}
        stroke="black"
        strokeWidth={8}
        strokeDasharray={length}
        fill="white"
      />
    </>
  );
};

export default AnimatedStroke;
