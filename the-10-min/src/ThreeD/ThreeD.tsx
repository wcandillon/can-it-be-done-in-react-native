import React from "react";
import { StyleSheet, View } from "react-native";
import { loop, mix, useLoop, useValue } from "react-native-redash";
import { set, useCode } from "react-native-reanimated";

import Face from "./Face";
import Point from "./Point";

import Gesture from "./Gesture";

const backface = [
  { x: -0.5, y: -0.5, z: -0.5 },
  { x: 0.5, y: -0.5, z: -0.5 },
  { x: 0.5, y: 0.5, z: -0.5 },
  { x: -0.5, y: 0.5, z: -0.5 },
] as const;

const frontface = [
  { x: -0.5, y: -0.5, z: 0.5 },
  { x: 0.5, y: -0.5, z: 0.5 },
  { x: -0.5, y: 0.5, z: 0.5 },
  { x: 0.5, y: 0.5, z: 0.5 },
] as const;

const topface = [
  { x: -0.5, y: 0.5, z: 0.5 },
  { x: 0.5, y: 0.5, z: 0.5 },
  { x: -0.5, y: 0.5, z: -0.5 },
  { x: 0.5, y: 0.5, z: -0.5 },
] as const;

const bottomface = [
  { x: 0.5, y: 0.5, z: 0.5 },
  { x: 0.5, y: -0.5, z: 0.5 },
  { x: 0.5, y: 0.5, z: -0.5 },
  { x: 0.5, y: -0.5, z: -0.5 },
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

const points = [...backface, ...frontface];

const ThreeD = () => {
  const progress = useLoop(4000, false);
  const theta = mix(progress, 0, 2 * Math.PI);
  return (
    <View style={StyleSheet.absoluteFill}>
      {points.map((point, index) => (
        <Point key={index} {...{ theta }} {...point} />
      ))}
      <Face
        label="Back"
        points={backface}
        backgroundColor="#7BFF70"
        {...{ theta }}
      />
      <Face
        label="Bottom"
        points={bottomface}
        backgroundColor="#FF6AFF"
        {...{ theta }}
      />
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
        label="Top"
        points={topface}
        backgroundColor="#7CFFFF"
        {...{ theta }}
      />
      <Face
        label="Front"
        points={frontface}
        backgroundColor="#FF665E"
        {...{ theta }}
      />
    </View>
  );
};

export default ThreeD;
