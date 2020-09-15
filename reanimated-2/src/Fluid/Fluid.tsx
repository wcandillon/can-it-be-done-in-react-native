import React from "react";
import { StyleSheet, View, Dimensions } from "react-native";
import Svg, { Path, Circle } from "react-native-svg";

import { cartesian2Canvas } from "../components/AnimatedHelpers";

import {
  createSVGPath,
  moveTo,
  curveTo,
  close,
  serialize,
  SVGCommand,
} from "./Path";

const { width } = Dimensions.get("window");
const SIZE = width * 0.61;
const C = 0.551915024494;
const CENTER = { x: 1, y: 1 };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const vec = (x: number, y: number) => cartesian2Canvas({ x, y }, CENTER);

const P00 = vec(0, 1);
const P01 = vec(C, 1);
const P02 = vec(1, C);
const P03 = vec(1, 0);

const P10 = vec(1, 0);
const P11 = vec(1, -C);
const P12 = vec(C, -1);
const P13 = vec(0, -1);

const P20 = vec(0, -1);
const P21 = vec(-C, -1);
const P22 = vec(-1, -C);
const P23 = vec(-1, 0);

const P30 = vec(-1, 0);
const P31 = vec(-1, C);
const P32 = vec(-C, 1);
const P33 = vec(0, 1);

/*
P0 = (0, 1), P1 = (C, 1), P2 = (1, C), P3 = (1, 0)
P0 = (1, 0), P1 = (1, -C), P2 = (C, -1), P3 = (0, -1)
P0 = (0, -1), P1 = (-C, -1), P2 = (-1, -C), P4 = (-1, 0)
P0 = (-1, 0), P1 = (-1, C), P2 = (-C, 1), P3 = (0, 1)
*/

const path = createSVGPath();
moveTo(path, P00.x, P00.y);
curveTo(path, {
  c1: P01,
  c2: P02,
  to: P03,
});
curveTo(path, {
  c1: P11,
  c2: P12,
  to: P13,
});
curveTo(path, {
  c1: P21,
  c2: P22,
  to: P23,
});
curveTo(path, {
  c1: P31,
  c2: P32,
  to: P33,
});
//close(path);
const d = serialize(path);

const Fluid = () => {
  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE} viewBox="0 0 2 2">
        <Path fill="rgba(100, 200, 300, 0.5)" d={d} />
        {path.map((c) => {
          if (c.type === SVGCommand.CURVE) {
            return (
              <>
                <Circle fill="green" r={0.05} cx={c.c1.x} cy={c.c1.y} />
                <Circle fill="green" r={0.05} cx={c.c2.x} cy={c.c2.y} />
                <Circle fill="red" r={0.1} cx={c.to.x} cy={c.to.y} />
              </>
            );
          }
          return null;
        })}
      </Svg>
    </View>
  );
};

export default Fluid;
