import React, { useRef, useState } from "react";
import { Dimensions, View, StyleSheet } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
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
  const rotate = useDerivedValue(() =>
    interpolate(progress.value, [0.75, 1], [0, 1], Extrapolate.CLAMP)
  );
  const strokeDashoffset = useDerivedValue(
    () =>
      length -
      length * interpolate(progress.value, [0, 0.75], [0, 1], Extrapolate.CLAMP)
  );
  const ellipse1 = useAnimatedProps(() => ({
    strokeDashoffset: strokeDashoffset.value,
  }));
  const ellipse2 = useAnimatedProps(() => ({
    strokeDashoffset: strokeDashoffset.value,
  }));
  const ellipse3 = useAnimatedProps(() => ({
    strokeDashoffset: strokeDashoffset.value,
  }));
  const style1 = useAnimatedProps(() => ({
    transform: [
      {
        rotate: (Math.PI / 6) * rotate.value,
      },
    ],
  }));
  const style2 = useAnimatedProps(() => ({
    transform: [
      {
        rotate: (-Math.PI / 6) * rotate.value,
      },
    ],
  }));
  const style3 = useAnimatedProps(() => ({
    transform: [
      {
        rotate: (Math.PI / 2) * rotate.value,
      },
    ],
  }));
  return (
    <View>
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
      </Svg>
      <Animated.View style={[StyleSheet.absoluteFill, style1]}>
        <Svg
          width={width}
          height={height}
          viewBox={[0, 0, vWidth, vHeight].join(" ")}
        >
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
        </Svg>
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, style2]}>
        <Svg
          width={width}
          height={height}
          viewBox={[0, 0, vWidth, vHeight].join(" ")}
        >
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
        </Svg>
      </Animated.View>
      <Animated.View style={[StyleSheet.absoluteFill, style3]}>
        <Svg
          width={width}
          height={height}
          viewBox={[0, 0, vWidth, vHeight].join(" ")}
        >
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
      </Animated.View>
    </View>
  );
};

export default AnimatedLogo;
