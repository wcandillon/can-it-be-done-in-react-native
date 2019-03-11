import * as React from "react";
import {
  SafeAreaView, StyleSheet, Dimensions,
} from "react-native";
// import { path } from "d3-path";
import * as shape from "d3-shape";


import { Svg } from "expo";

const { width } = Dimensions.get("window");
const height = 64;
const { Path } = Svg;
const tabs = [
  {
    name: "grid",
  },
  {
    name: "list",
  },
  {
    name: "repeat",
  },
  {
    name: "map",
  },
  {
    name: "user",
  },
];
const tabWidth = width / tabs.length;

const getPath = (index: number): string => shape.line()
  .x(d => d.x)
  .y(d => d.y)
  .curve(shape.curveMonotoneX)([
    { x: 0, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
  ]);
interface TabbarProps {}

// eslint-disable-next-line react/prefer-stateless-function
export default class Tabbar extends React.PureComponent<TabbarProps> {
  render() {
    const d = getPath(0);
    console.log({ d });
    return (
      <SafeAreaView style={styles.container}>
        <Svg {...{ width, height }}>
          <Path fill="blue" {...{ d }} />
        </Svg>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
  },
});
