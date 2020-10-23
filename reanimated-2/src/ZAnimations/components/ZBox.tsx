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
}: ZBoxProps) => {
  return (
    <>
      <ZRect
        width={width}
        height={height}
        stroke={front}
        strokeWidth={0}
        fill
      />
      <ZRect width={width} height={height} stroke={back} strokeWidth={0} fill />
      <ZRect width={width} height={depth} stroke={top} strokeWidth={0} fill />
    </>
  );
};

export default ZBox;
