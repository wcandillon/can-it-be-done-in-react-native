/* eslint-disable @typescript-eslint/no-var-requires */
import React, { useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Canvas, useFrame } from "react-three-fiber";
import { Group, Vector3 } from "three";

import { useModel, pivotMatrix } from "./ThreeHelpers";

const SIZE = new Vector3(263.2, 29.606, 257.882);
const TOTAL_FRAMES = 30;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
});

interface BoxProps {
  model: Group;
  from: number;
  to: number;
  active: boolean;
}

const Box = ({ model, from, to, active }: BoxProps) => {
  const frames = useRef(0);
  const init = useRef(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<any>(null);
  useFrame(() => {
    if (!init.current && from !== 0) {
      const m = pivotMatrix(-SIZE.z / 2, from);
      ref.current?.applyMatrix4(m);
      init.current = true;
    }
    if (!active) {
      return;
    }
    frames.current += 1;
    if (frames.current > TOTAL_FRAMES) {
      return;
    }
    const delta = (to - from) / TOTAL_FRAMES;
    const m = pivotMatrix(-SIZE.z / 2, delta);
    ref.current?.applyMatrix4(m);
  });
  return (
    <primitive
      ref={ref}
      object={model}
      position={[0, 0, 0]}
      rotation={[Math.PI / 3, Math.PI, 0]}
    />
  );
};

interface PizzaBoxProps {
  active: boolean;
}

const PizzaBox = ({ active }: PizzaBoxProps) => {
  const top = useModel(require("../assets/Pizza_Box_Top3.gltf"));
  const bottom = useModel(require("../assets/Pizza_Box_Bottom3.gltf"));
  if (top === null || bottom === null) {
    return <View style={styles.container} />;
  }
  const r = 300;
  return (
    <Canvas style={styles.container} camera={{ position: [0, 0, r] }}>
      <directionalLight position={[0, 0, r]} />
      <Box model={top} from={-Math.PI / 4} to={0} active={active} />
      <Box model={bottom} from={0} to={0} active={false} />
    </Canvas>
  );
};

export default PizzaBox;
