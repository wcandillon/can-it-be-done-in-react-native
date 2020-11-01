import React from "react";
import { Circle } from "react-native-svg";

import Layer from "./Layer";
import ZEllipse from "./ZEllipse";
import { useZSvg } from "./ZSvg";

const r = 0.9;
const stroke = "#61DAFB";
const strokeWidth = 0.05;
const TAU = Math.PI * 2;
const ReactLogo = () => {
  const { canvas } = useZSvg();
  return (
    <>
      <Layer zIndexStyle={{ zIndex: 0 }}>
        <Circle r={strokeWidth * canvas.x} fill={stroke} />
      </Layer>
      <ZEllipse
        rx={r}
        ry={r}
        strokeWidth={strokeWidth}
        stroke={stroke}
        transform={[{ rotateX: Math.PI / 2 }]}
      />
      <ZEllipse
        rx={r}
        ry={r}
        strokeWidth={strokeWidth}
        stroke={stroke}
        transform={[{ rotateY: Math.PI / 2 }]}
      />
      <ZEllipse
        rx={r}
        ry={r}
        strokeWidth={strokeWidth}
        stroke={stroke}
        transform={[{ rotateZ: Math.PI / 2 }]}
      />
    </>
  );
};

export default ReactLogo;
