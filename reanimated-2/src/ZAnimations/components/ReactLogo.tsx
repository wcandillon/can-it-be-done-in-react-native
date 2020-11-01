import React from "react";
import { Circle } from "react-native-svg";

import Layer from "./Layer";
import ZEllipse from "./ZEllipse";
import { useZSvg } from "./ZSvg";

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
  return (
    <>
      <Layer zIndexStyle={{ zIndex: 0 }}>
        <Circle r={(strokeWidth * canvas.x) / 2} fill={stroke} />
      </Layer>
      <ZEllipse
        rx={r}
        ry={r}
        strokeWidth={strokeWidth}
        stroke={stroke}
        transform={[{ rotateX: Math.PI / 2 }, ...transform]}
      />
      <ZEllipse
        rx={r}
        ry={r}
        strokeWidth={strokeWidth}
        stroke={stroke}
        transform={[{ rotateY: Math.PI / 1.5 }, ...transform]}
      />
      <ZEllipse
        rx={r}
        ry={r}
        strokeWidth={strokeWidth}
        stroke={stroke}
        transform={[{ rotateY: Math.PI / 0.75 }, ...transform]}
      />
    </>
  );
};

export default ReactLogo;
