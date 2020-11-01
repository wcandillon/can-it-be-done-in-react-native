import React, { useEffect } from "react";
import Animated, {
  Easing,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Circle } from "react-native-svg";

import Layer from "./Layer";
import ZEllipse from "./ZEllipse";
import { useZSvg } from "./ZSvg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const r = 0.9;
const stroke = "#61DAFB";
const strokeWidth = 0.1;
const transform = [
  {
    rotateX: Math.PI / 6,
  },
];

const ReactLogo = () => {
  const { canvas } = useZSvg();
  const progress = useSharedValue(0);
  useEffect(() => {
    progress.value = withTiming(1, {
      duration: 2000,
      easing: Easing.inOut(Easing.ease),
    });
  }, [progress]);
  const circle = useAnimatedProps(() => ({
    r: (progress.value * (strokeWidth * canvas.x)) / 2,
    fillOpacity: progress.value,
  }));
  return (
    <>
      <Layer zIndexStyle={{ zIndex: 0 }}>
        <AnimatedCircle animatedProps={circle} fill={stroke} />
      </Layer>
      <ZEllipse
        rx={r}
        ry={r}
        strokeWidth={strokeWidth}
        stroke={stroke}
        transform={[{ rotateX: Math.PI / 2 }, ...transform]}
        progress={progress}
      />
      <ZEllipse
        rx={r}
        ry={r}
        strokeWidth={strokeWidth}
        stroke={stroke}
        transform={[{ rotateY: Math.PI / 1.5 }, ...transform]}
        progress={progress}
      />
      <ZEllipse
        rx={r}
        ry={r}
        strokeWidth={strokeWidth}
        stroke={stroke}
        transform={[{ rotateY: Math.PI / 0.75 }, ...transform]}
        progress={progress}
      />
    </>
  );
};

export default ReactLogo;
