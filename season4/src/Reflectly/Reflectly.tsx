import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { curve, move, serialize } from "react-native-redash";
import Svg, { Circle, parse, Path } from "react-native-svg";

import Tabbar from "./Tabbar";

const SIZE = Dimensions.get("window").width / 2;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "#C0C6D4",
  },
});

const d = [
  move(25, 0),
  curve({
    c1: {
      x: 11.1929,
      y: 0,
    },
    c2: {
      x: 0,
      y: 11.1929,
    },
    to: {
      x: 0,
      y: 25,
    },
    from: {
      x: 25,
      y: 0,
    },
  }),
  curve({
    c1: {
      x: 0,
      y: 25,
    },
    c2: {
      x: 0,
      y: 175,
    },
    to: {
      x: 0,
      y: 175,
    },
    from: {
      x: 0,
      y: 25,
    },
  }),
  curve({
    c1: {
      x: 0,
      y: 188.807,
    },
    c2: {
      x: 11.1929,
      y: 200,
    },
    to: {
      x: 25,
      y: 200,
    },
    from: {
      x: 0,
      y: 175,
    },
  }),
  curve({
    c1: {
      x: 25,
      y: 200,
    },
    c2: {
      x: 75,
      y: 200,
    },
    to: {
      x: 75,
      y: 200,
    },
    from: {
      x: 25,
      y: 200,
    },
  }),
  curve({
    c1: {
      x: 88.8071,
      y: 200,
    },
    c2: {
      x: 100,
      y: 211.193,
    },
    to: {
      x: 100,
      y: 225,
    },
    from: {
      x: 75,
      y: 200,
    },
  }),
  curve({
    c1: {
      x: 100,
      y: 225,
    },
    c2: {
      x: 100,
      y: 275,
    },
    to: {
      x: 100,
      y: 275,
    },
    from: {
      x: 100,
      y: 225,
    },
  }),
  curve({
    c1: {
      x: 100,
      y: 288.807,
    },
    c2: {
      x: 111.193,
      y: 300,
    },
    to: {
      x: 125,
      y: 300,
    },
    from: {
      x: 100,
      y: 275,
    },
  }),
  curve({
    c1: {
      x: 125,
      y: 300,
    },
    c2: {
      x: 175,
      y: 300,
    },
    to: {
      x: 175,
      y: 300,
    },
    from: {
      x: 125,
      y: 300,
    },
  }),
  curve({
    c1: {
      x: 188.807,
      y: 300,
    },
    c2: {
      x: 200,
      y: 288.807,
    },
    to: {
      x: 200,
      y: 275,
    },
    from: {
      x: 175,
      y: 300,
    },
  }),
  curve({
    c1: {
      x: 200,
      y: 275,
    },
    c2: {
      x: 200,
      y: 225,
    },
    to: {
      x: 200,
      y: 225,
    },
    from: {
      x: 200,
      y: 275,
    },
  }),
  curve({
    c1: {
      x: 200,
      y: 211.193,
    },
    c2: {
      x: 211.193,
      y: 200,
    },
    to: {
      x: 225,
      y: 200,
    },
    from: {
      x: 200,
      y: 225,
    },
  }),
  curve({
    c1: {
      x: 225,
      y: 200,
    },
    c2: {
      x: 275,
      y: 200,
    },
    to: {
      x: 275,
      y: 200,
    },
    from: {
      x: 225,
      y: 200,
    },
  }),
  curve({
    c1: {
      x: 288.807,
      y: 200,
    },
    c2: {
      x: 300,
      y: 188.807,
    },
    to: {
      x: 300,
      y: 175,
    },
    from: {
      x: 275,
      y: 200,
    },
  }),
  curve({
    c1: {
      x: 300,
      y: 175,
    },
    c2: {
      x: 300,
      y: 25,
    },
    to: {
      x: 300,
      y: 25,
    },
    from: {
      x: 300,
      y: 175,
    },
  }),
  curve({
    c1: {
      x: 300,
      y: 11.1929,
    },
    c2: {
      x: 288.807,
      y: 0,
    },
    to: {
      x: 275,
      y: 0,
    },
    from: {
      x: 300,
      y: 25,
    },
  }),
  curve({
    c1: {
      x: 275,
      y: 0,
    },
    c2: {
      x: 25,
      y: 0,
    },
    to: {
      x: 25,
      y: 0,
    },
    from: {
      x: 275,
      y: 0,
    },
  }),
  curve({
    c1: {
      x: 25,
      y: 0,
    },
    c2: {
      x: 25,
      y: 0,
    },
    to: {
      x: 25,
      y: 0,
    },
    from: {
      x: 25,
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
            <Circle r={5} fill="red" cx={c.from.x} cy={c.from.y} />
            <Circle r={5} fill="red" cx={c.to.x} cy={c.to.y} />
            <Circle r={2.5} fill="green" cx={c.c1.x} cy={c.c1.y} />
            <Circle r={2.55} fill="green" cx={c.c2.x} cy={c.c2.y} />
          </>
        ))}
      </Svg>
      <Tabbar />
    </View>
  );
};

export default Reflectly;
