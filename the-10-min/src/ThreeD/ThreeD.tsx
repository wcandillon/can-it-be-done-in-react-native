import React from "react";
import { Dimensions, View } from "react-native";
import { mix, useLoop } from "react-native-redash";

import Face from "./Face";

const { width, height } = Dimensions.get("window");
const backface = [
  { x: -0.5, y: -0.5, z: -0.5 },
  { x: 0.5, y: -0.5, z: -0.5 },
  { x: -0.5, y: 0.5, z: -0.5 },
  { x: 0.5, y: 0.5, z: -0.5 },
] as const;

const frontface = [
  { x: -0.5, y: -0.5, z: 0.5 },
  { x: 0.5, y: -0.5, z: 0.5 },
  { x: -0.5, y: 0.5, z: 0.5 },
  { x: 0.5, y: 0.5, z: 0.5 },
] as const;

const topface = [
  { x: -0.5, y: -0.5, z: 0.5 },
  { x: 0.5, y: -0.5, z: 0.5 },
  { x: -0.5, y: -0.5, z: -0.5 },
  { x: 0.5, y: -0.5, z: -0.5 },
] as const;

const bottomface = [
  { x: -0.5, y: 0.5, z: 0.5 },
  { x: 0.5, y: 0.5, z: 0.5 },
  { x: -0.5, y: 0.5, z: -0.5 },
  { x: 0.5, y: 0.5, z: -0.5 },
] as const;

const leftface = [
  { x: -0.5, y: 0.5, z: 0.5 },
  { x: -0.5, y: -0.5, z: 0.5 },
  { x: -0.5, y: 0.5, z: -0.5 },
  { x: -0.5, y: -0.5, z: -0.5 },
] as const;

const rightface = [
  { x: 0.5, y: 0.5, z: 0.5 },
  { x: 0.5, y: -0.5, z: 0.5 },
  { x: 0.5, y: 0.5, z: -0.5 },
  { x: 0.5, y: -0.5, z: -0.5 },
] as const;

// const points = [...frontface, ...backface];

const ThreeD = () => {
  const progress = useLoop(4000, false);
  const theta = mix(progress, 0, 2 * Math.PI);
  return (
    <View
      style={{
        flex: 1,
        transform: [{ translateX: width / 4 }, { translateY: height / 4 }],
      }}
    >
      <Face
        label="Left"
        points={leftface}
        backgroundColor="#FFFF72"
        {...{ theta }}
      />
      <Face
        label="Right"
        points={rightface}
        backgroundColor="#495DFF"
        {...{ theta }}
      />
      <Face
        label="Back"
        points={backface}
        backgroundColor="#7BFF70"
        {...{ theta }}
      />
      <Face
        label="Front"
        points={frontface}
        backgroundColor="#FF665E"
        {...{ theta }}
      />
      <Face
        label="Bottom"
        points={bottomface}
        backgroundColor="#FF6AFF"
        {...{ theta }}
      />
      <Face
        label="Top"
        points={topface}
        backgroundColor="#7CFFFF"
        {...{ theta }}
      />
    </View>
  );
};

export default ThreeD;
