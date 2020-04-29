import React from "react";
import { StyleSheet, View } from "react-native";
import { loop, mix, useValue } from "react-native-redash";
import { set, useCode } from "react-native-reanimated";
import Point from "./Point";

const points = [
  { x: -0.5, y: -0.5, z: -0.5 },
  { x: 0.5, y: -0.5, z: -0.5 },
  { x: 0.5, y: 0.5, z: -0.5 },
  { x: -0.5, y: 0.5, z: -0.5 },
  { x: -0.5, y: -0.5, z: 0.5 },
  { x: 0.5, y: -0.5, z: 0.5 },
  { x: 0.5, y: 0.5, z: 0.5 },
  { x: -0.5, y: 0.5, z: 0.5 },
];

const ThreeD = () => {
  const progress = useValue(0);
  useCode(() => set(progress, loop({ duration: 4000 })), [progress]);
  const theta = mix(progress, 0, 2 * Math.PI);
  return (
    <View style={StyleSheet.absoluteFill}>
      {points.map((point, index) => (
        <Point key={index} {...{ theta }} {...point} />
      ))}
    </View>
  );
};

export default ThreeD;
