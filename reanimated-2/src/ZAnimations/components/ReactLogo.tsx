import React from "react";
import { Circle } from "react-native-svg";

import Layer from "./Layer";
import ZEllipse from "./ZEllipse";
import { useZSvg } from "./ZSvg";

const r = 0.9;
const stroke = "#61DAFB";
const strokeWidth = 0.05;
const delta = (Math.PI * 2) / 3;
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
        transform={[{ rotateY: delta }]}
      />
      <ZEllipse
        rx={r}
        ry={r}
        strokeWidth={strokeWidth}
        stroke={stroke}
        transform={[{ rotateY: delta * 2 }]}
      />
    </>
  );
};

export default ReactLogo;
