import React from "react";
import { Circle } from "react-native-svg";

import Layer from "./Layer";
import ZEllipse from "./ZEllipse";
import { useZSvg } from "./ZSvg";

const r = 0.9;
const stroke = "#61DAFB";
const strokeWidth = 0.05;
const transform = [];
/*

 {
    rotateX: -12.24087585927556,
  },
  {
    rotateY: -6.673138373733811,
  },
 [
  { rotateX: Math.PI / 8 },
  { rotateY: Math.PI / 8 },
  { rotateZ: Math.PI / 8 },
];
*/
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
        transform={[...transform, { rotateY: Math.PI / 6 + Math.PI / 2 }]}
      />
      <ZEllipse
        rx={r}
        ry={r}
        strokeWidth={strokeWidth}
        stroke={stroke}
        transform={[
          ...transform,
          { rotateX: Math.PI / 2 },
          { rotateY: Math.PI / 6 },
        ]}
      />
      <ZEllipse
        rx={r}
        ry={r}
        strokeWidth={strokeWidth}
        stroke={stroke}
        transform={[
          ...transform,
          { rotateX: Math.PI / 2 },
          { rotateY: -Math.PI / 6 },
        ]}
      />
    </>
  );
};

export default ReactLogo;

/*

      <ZEllipse
        rx={r}
        ry={r}
        strokeWidth={strokeWidth}
        stroke={stroke}
        transform={[...transform, { rotateY: (2 * Math.PI) / 1.5 }]}
      />



      <ZEllipse
        rx={r}
        ry={r}
        strokeWidth={strokeWidth}
        stroke={stroke}
        transform={[{ rotateY: Math.PI / 2 }, { rotateZ: -Math.PI / 2 }]}
      />
      */
