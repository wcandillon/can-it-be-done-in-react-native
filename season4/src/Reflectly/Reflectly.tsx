import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { move, serialize, SVGCommand } from "react-native-redash";
import Svg, { Circle, Path } from "react-native-svg";

import Tabbar from "./Tabbar";

export const curve = (c) => {
  "worklet";
  return {
    type: SVGCommand.CURVE as const,
    ...c,
  };
};

const SIZE = Dimensions.get("window").width / 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#C0C6D4",
  },
});

const R = 25;
const C = 11.1929;
const S = 100;
const d = [
  move(R, 0),
  curve({
    color: "green",
    c1: {
      x: C,
      y: 0,
    },
    c2: {
      x: 0,
      y: C,
    },
    to: {
      x: 0,
      y: R,
    },
    from: {
      x: R,
      y: 0,
    },
  }),
  curve({
    color: "green",
    c1: {
      x: 0,
      y: R,
    },
    c2: {
      x: 0,
      y: 2 * S - R,
    },
    to: {
      x: 0,
      y: 2 * S - R,
    },
    from: {
      x: 0,
      y: R,
    },
  }),
  curve({
    color: "green",
    c1: {
      x: 0,
      y: 2 * S - C,
    },
    c2: {
      x: C,
      y: 2 * S,
    },
    to: {
      x: R,
      y: 2 * S,
    },
    from: {
      x: 0,
      y: 2 * S - R,
    },
  }),
  curve({
    color: "green",
    c1: {
      x: R,
      y: 2 * S,
    },
    c2: {
      x: S - R,
      y: 2 * S,
    },
    to: {
      x: S - R,
      y: 2 * S,
    },
    from: {
      x: R,
      y: 2 * S,
    },
  }),
  curve({
    color: "green",
    c1: {
      x: S - C,
      y: 2 * S,
    },
    c2: {
      x: S,
      y: 2 * S + C,
    },
    to: {
      x: S,
      y: 2 * S + R,
    },
    from: {
      x: S - R,
      y: 2 * S,
    },
  }),
  curve({
    color: "green",
    c1: {
      x: S,
      y: 2 * S + R,
    },
    c2: {
      x: S,
      y: 3 * S - R,
    },
    to: {
      x: S,
      y: 3 * S - R,
    },
    from: {
      x: S,
      y: 2 * S + R,
    },
  }),
  curve({
    color: "red",
    c1: {
      x: S,
      y: 3 * S - C,
    },
    c2: {
      x: S + C,
      y: 3 * S,
    },
    to: {
      x: S + R,
      y: 3 * S,
    },
    from: {
      x: S,
      y: 3 * S - R,
    },
  }),
  curve({
    color: "red",
    c1: {
      x: S + R,
      y: 3 * S,
    },
    c2: {
      x: 2 * S - R,
      y: 3 * S,
    },
    to: {
      x: 2 * S - R,
      y: 3 * S,
    },
    from: {
      x: S + R,
      y: 3 * S,
    },
  }),
  curve({
    color: "red",
    c1: {
      x: 2 * S - C,
      y: 3 * S,
    },
    c2: {
      x: 2 * S,
      y: 3 * S - C,
    },
    to: {
      x: 2 * S,
      y: 3 * S - R,
    },
    from: {
      x: 2 * S - R,
      y: 3 * S,
    },
  }),
  curve({
    color: "red",
    c1: {
      x: 2 * S,
      y: 3 * S - R,
    },
    c2: {
      x: 2 * S,
      y: 2 * S + R,
    },
    to: {
      x: 2 * S,
      y: 2 * S + R,
    },
    from: {
      x: 2 * S,
      y: 3 * S - R,
    },
  }),
  curve({
    color: "blue",
    c1: {
      x: 2 * S,
      y: 2 * S + C,
    },
    c2: {
      x: 2 * S + C,
      y: 2 * S,
    },
    to: {
      x: 2 * S + R,
      y: 2 * S,
    },
    from: {
      x: 2 * S,
      y: 2 * S + R,
    },
  }),
  curve({
    color: "blue",
    c1: {
      x: 2 * S + R,
      y: 2 * S,
    },
    c2: {
      x: 3 * S - R,
      y: 2 * S,
    },
    to: {
      x: 3 * S - R,
      y: 2 * S,
    },
    from: {
      x: 2 * S + R,
      y: 2 * S,
    },
  }),
  curve({
    color: "blue",
    c1: {
      x: 3 * S - C,
      y: 2 * S,
    },
    c2: {
      x: 3 * S,
      y: 2 * S - C,
    },
    to: {
      x: 3 * S,
      y: 2 * S - R,
    },
    from: {
      x: 3 * S - R,
      y: 2 * S,
    },
  }),
  curve({
    color: "blue",
    c1: {
      x: 3 * S,
      y: 2 * S - R,
    },
    c2: {
      x: 3 * S,
      y: R,
    },
    to: {
      x: 3 * S,
      y: R,
    },
    from: {
      x: 3 * S,
      y: 2 * S - R,
    },
  }),
  curve({
    color: "blue",
    c1: {
      x: 3 * S,
      y: C,
    },
    c2: {
      x: 3 * S - C,
      y: 0,
    },
    to: {
      x: 3 * S - R,
      y: 0,
    },
    from: {
      x: 3 * S,
      y: R,
    },
  }),
  curve({
    color: "blue",
    c1: {
      x: 3 * S - R,
      y: 0,
    },
    c2: {
      x: R,
      y: 0,
    },
    to: {
      x: R,
      y: 0,
    },
    from: {
      x: 3 * S - R,
      y: 0,
    },
  }),
  curve({
    color: "green",
    c1: {
      x: R,
      y: 0,
    },
    c2: {
      x: R,
      y: 0,
    },
    to: {
      x: R,
      y: 0,
    },
    from: {
      x: R,
      y: 0,
    },
  }),
];

const Reflectly = () => {
  return (
    <View style={styles.container}>
      <Svg width={SIZE} height={SIZE} viewBox="0 0 300 300">
        <Path d={serialize(d)} fill="#02CBD6" />
        {d.slice(1).map((c) => (
          <>
            <Circle r={5} fill={c.color} cx={c.from.x} cy={c.from.y} />
            <Circle r={5} fill={c.color} cx={c.to.x} cy={c.to.y} />
            <Circle r={2.5} fill={c.color} cx={c.c1.x} cy={c.c1.y} />
            <Circle r={2.55} fill={c.color} cx={c.c2.x} cy={c.c2.y} />
          </>
        ))}
      </Svg>
      <Tabbar />
    </View>
  );
};

export default Reflectly;
