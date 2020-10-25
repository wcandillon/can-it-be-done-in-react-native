import React from "react";
import { processColor } from "react-native";
import Animated, {
  useAnimatedProps,
  useDerivedValue,
} from "react-native-reanimated";
import { processTransform3d } from "react-native-redash";
import { Circle, Ellipse } from "react-native-svg";

import Layer from "./Layer";
import { project } from "./Vector";
import { useZSvg } from "./ZSvg";

interface ConeProps {
  r: number;
  length: number;
  base: string;
  body: string;
}

const AnimatedEllipse = Animated.createAnimatedComponent(Ellipse);

const Cone = ({ r, length, base: baseColor, body: bodyColor }: ConeProps) => {
  const c1 = processColor(baseColor);
  const c2 = processColor(bodyColor);
  const { camera, canvas } = useZSvg();
  const data = useDerivedValue(() => {
    const cameraTransform = processTransform3d([
      //   { perspective: 5 },
      { rotateY: camera.x.value },
      { rotateX: camera.y.value },
    ]);
    const apex = project({ x: 0, y: 0, z: -length }, canvas, cameraTransform);
    const p1 = project({ x: -r, y: r, z: 0 }, canvas, cameraTransform);
    const p2 = project({ x: 0, y: r, z: 0 }, canvas, cameraTransform);
    return { apex, p1, p2 };
  });
  const ellipse = useAnimatedProps(() => ({
    rx: data.value.p1.x,
    ry: (r * canvas.x) / 2,
    fill: data.value.apex.z < 0 ? c1 : c2,
  }));
  return (
    <>
      <Layer zIndexStyle={{ zIndex: 0 }}>
        <AnimatedEllipse animatedProps={ellipse} cx={0} cy={0} />
      </Layer>
      <Layer zIndexStyle={{ zIndex: 10 }}>
        <Circle
          cx={0}
          cy={0}
          r={(r * canvas.x) / 2}
          stroke="blue"
          strokeWidth={1}
        />
      </Layer>
    </>
  );
};

export default Cone;
