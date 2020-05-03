import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { mix, useLoop, useValues } from "react-native-redash";

import { debug, useCode } from "react-native-reanimated";
import Face from "./Face";
import Gesture from "./Gesture";

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
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
  const [rotateX, rotateY] = useValues([0, 0]);
  return (
    <View style={styles.container}>
      <Face
        label="Left"
        points={leftface}
        backgroundColor="#FFFF72"
        {...{ rotateX, rotateY }}
      />
      <Face
        label="Right"
        points={rightface}
        backgroundColor="#495DFF"
        {...{ rotateX, rotateY }}
      />
      <Face
        label="Back"
        points={backface}
        backgroundColor="#7BFF70"
        {...{ rotateX, rotateY }}
      />
      <Face
        label="Front"
        points={frontface}
        backgroundColor="#FF665E"
        {...{ rotateX, rotateY }}
      />
      <Face
        label="Bottom"
        points={bottomface}
        backgroundColor="#FF6AFF"
        {...{ rotateX, rotateY }}
      />
      <Face
        label="Top"
        points={topface}
        backgroundColor="#7CFFFF"
        {...{ rotateX, rotateY }}
      />
      <Gesture {...{ rotateX, rotateY }} />
    </View>
  );
};

export default ThreeD;
