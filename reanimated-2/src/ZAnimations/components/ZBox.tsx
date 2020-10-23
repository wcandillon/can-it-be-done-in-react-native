import React from "react";

import ZRect from "./ZRect";

interface ZBoxProps {
  width: number;
  height: number;
  depth: number;
  front: string;
  back: string;
  left: string;
  right: string;
  top: string;
  bottom: string;
}

const ZBox = ({
  width,
  height,
  depth,
  front,
  back,
  top,
  bottom,
  left,
}: ZBoxProps) => {
  return (
    <>
      <ZRect
        width={width}
        height={height}
        stroke={front}
        strokeWidth={0}
        transform={[{ translateZ: depth / 2 }]}
        fill
      />
      <ZRect
        width={width}
        height={height}
        stroke={back}
        strokeWidth={0}
        transform={[{ translateZ: -depth / 2 }]}
        fill
      />
      <ZRect
        width={width}
        height={depth}
        stroke={top}
        strokeWidth={0}
        transform={[{ translateY: height / 2 }, { rotateX: Math.PI / 2 }]}
        fill
      />
      <ZRect
        width={width}
        height={depth}
        stroke={bottom}
        strokeWidth={0}
        transform={[{ translateY: -height / 2 }, { rotateX: Math.PI / 2 }]}
        fill
      />
      <ZRect
        width={width}
        height={height}
        stroke={left}
        strokeWidth={0}
        transform={[{ translateX: -height / 2 }, { rotateY: Math.PI / 2 }]}
        fill
      />
      <ZRect
        width={width}
        height={height}
        stroke={left}
        strokeWidth={0}
        transform={[{ translateX: height / 2 }, { rotateY: Math.PI / 2 }]}
        fill
      />
    </>
  );
};

export default ZBox;
