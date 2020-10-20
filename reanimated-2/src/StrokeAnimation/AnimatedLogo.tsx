import React, { useRef, useState } from "react";
import { Dimensions } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { mix } from "react-native-redash";
import Svg, { Circle, Ellipse } from "react-native-svg";

const vWidth = 499;
const vHeight = 533;
const width = Dimensions.get("window").width + 64;
const height = (width * vHeight) / vWidth;

const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface AnimatedLogoProps {
  progress: Animated.SharedValue<number>;
}

const AnimatedLogo = ({ progress }: AnimatedLogoProps) => {
  const ref = useRef<typeof AnimatedEllipse>(null);
  const [length, setLength] = useState(0);
  const circle = useAnimatedProps(() => ({
    r: progress.value * 35,
    fillOpacity: progress.value,
  }));
  const part1 = useDerivedValue(() =>
    interpolate(progress.value, [0, 0.5], [0, 1], Extrapolate.CLAMP)
  );
  const part2 = useDerivedValue(() =>
    interpolate(progress.value, [0.5, 1], [0, 1], Extrapolate.CLAMP)
  );
  const ellipse = useDerivedValue(() => length - length * part1.value);
  const ellipse1 = useAnimatedProps(() => ({
    strokeDashoffset: ellipse.value,
    transform: `rotate(${30 * part2.value} 249.5 266.663)`,
  }));
  const ellipse2 = useAnimatedProps(() => ({
    strokeDashoffset: ellipse.value,
    transform: `rotate(${-30 * part2.value} 249.5 266.663)`,
  }));
  const ellipse3 = useAnimatedProps(() => ({
    strokeDashoffset: ellipse.value,
    transform: `rotate(${90 * part2.value} 249.5 266.663)`,
  }));
  return (
    <Svg
      width={width}
      height={height}
      viewBox={[0, 0, vWidth, vHeight].join(" ")}
    >
      <AnimatedCircle
        animatedProps={circle}
        fill="#61DAFB"
        cx={vWidth / 2}
        cy={vHeight / 2}
      />
      <AnimatedEllipse
        ref={ref}
        animatedProps={ellipse1}
        onLayout={() => setLength(ref.current.getTotalLength())}
        cx={249.5}
        cy={266.663}
        rx={90.5}
        ry={239.5}
        stroke="#61DAFB"
        strokeWidth={20}
        strokeDasharray={length}
      />
      <AnimatedEllipse
        animatedProps={ellipse2}
        cx={249.5}
        cy={266.663}
        rx={90.5}
        ry={239.5}
        stroke="#61DAFB"
        strokeWidth={20}
        strokeDasharray={length}
      />
      <AnimatedEllipse
        animatedProps={ellipse3}
        cx={249.5}
        cy={266.663}
        rx={90.5}
        ry={239.5}
        stroke="#61DAFB"
        strokeWidth={20}
        strokeDasharray={length}
      />
    </Svg>
  );
};

export default AnimatedLogo;
