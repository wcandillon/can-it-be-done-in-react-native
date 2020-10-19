import React, { useEffect, useMemo, useRef, useState } from "react";
import Animated, { useAnimatedProps } from "react-native-reanimated";
import { parse, serialize } from "react-native-redash";
import { Path } from "react-native-svg";

interface AnimatedStrokeProps {
  d: string;
  progress: Animated.SharedValue<number>;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedStroke = ({ d, progress }: AnimatedStrokeProps) => {
  const ref = useRef<typeof AnimatedPath>(null);
  const [length, setLength] = useState(0);
  console.log({ length });
  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: length - length * progress.value,
  }));
  return (
    <AnimatedPath
      ref={ref}
      onLayout={() => setLength(ref.current.getTotalLength)}
      animatedProps={animatedProps}
      d={d}
      stroke="black"
      strokeWidth={10}
      strokeDasharray={length}
    />
  );
};

export default AnimatedStroke;
