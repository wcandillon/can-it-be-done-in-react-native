import React, { useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
} from "react-native-reanimated";
import Svg, { Ellipse, Circle } from "react-native-svg";

interface AnimatedLogoProps {
  progress: Animated.SharedValue<number>;
}

const vWidth = 842;
const vHeight = 596;
const width = Dimensions.get("window").width + 64;
const height = (width * vHeight) / vWidth;
const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);
const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const AnimatedLogo = ({ progress: progressRaw }: AnimatedLogoProps) => {
  const part1 = useDerivedValue(() =>
    Easing.inOut(Easing.ease)(
      interpolate(progressRaw.value, [0, 0.75], [0, 1], Extrapolate.CLAMP)
    )
  );
  const part2 = useDerivedValue(() =>
    Easing.inOut(Easing.ease)(
      interpolate(progressRaw.value, [0.75, 1], [0, 1], Extrapolate.CLAMP)
    )
  );
  const [length, setLength] = useState(0);
  const ref = useRef<Ellipse>(null);
  const circle = useAnimatedProps(() => ({
    r: part1.value * 30,
    fillOpacity: part1.value,
  }));
  const strokeAnimation = () => {
    "worklet";
    return {
      strokeDashoffset: length - length * part1.value,
    };
  };
  const rotateAnimation = (target: number) => () => {
    "worklet";
    return {
      transform: [{ rotate: `${target * part2.value}rad` }],
    };
  };
  const stroke1 = useAnimatedProps(strokeAnimation);
  const stroke2 = useAnimatedProps(strokeAnimation);
  const stroke3 = useAnimatedProps(strokeAnimation);
  const rotate1 = useAnimatedStyle(rotateAnimation(Math.PI / 6));
  const rotate2 = useAnimatedStyle(rotateAnimation(-Math.PI / 6));
  const rotate3 = useAnimatedStyle(rotateAnimation(Math.PI / 2));
  return (
    <View>
      <Animated.View style={rotate1}>
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
            animatedProps={stroke1}
            onLayout={() => setLength(ref.current!.getTotalLength())}
            ref={ref}
            strokeWidth={20}
            stroke="#61DAFB"
            cx={vWidth / 2}
            cy={vHeight / 2}
            rx={207 / 2}
            ry={488 / 2}
            strokeDasharray={length}
          />
        </Svg>
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, rotate2]}>
        <Svg
          width={width}
          height={height}
          viewBox={[0, 0, vWidth, vHeight].join(" ")}
        >
          <AnimatedEllipse
            animatedProps={stroke2}
            strokeWidth={20}
            stroke="#61DAFB"
            cx={vWidth / 2}
            cy={vHeight / 2}
            rx={207 / 2}
            ry={488 / 2}
            strokeDasharray={length}
          />
        </Svg>
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, rotate3]}>
        <Svg
          width={width}
          height={height}
          viewBox={[0, 0, vWidth, vHeight].join(" ")}
        >
          <AnimatedEllipse
            animatedProps={stroke3}
            strokeWidth={20}
            stroke="#61DAFB"
            cx={vWidth / 2}
            cy={vHeight / 2}
            rx={207 / 2}
            ry={488 / 2}
            strokeDasharray={length}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default AnimatedLogo;
