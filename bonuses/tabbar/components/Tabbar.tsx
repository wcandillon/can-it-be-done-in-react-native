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
const backgroundColor = "white";

const getPath = (index: number): string => {
  const start = index * tabWidth;
  const end = start + tabWidth;
  const left = shape.line().x(d => d.x).y(d => d.y)([
    { x: 0, y: 0 },
    { x: start, y: 0 },
  ]);
  // .curve(shape.curveMonotoneX)
  const tab = shape.line().x(d => d.x).y(d => d.y).curve(shape.curveBasis)([
    { x: start, y: 0 },
    { x: start + 10, y: 10 },
    { x: start + 15, y: height },
    { x: end - 15, y: height },
    { x: end - 10, y: 10 },
    { x: end, y: 0 },
  ]);
  const right = shape.line().x(d => d.x).y(d => d.y)([
    { x: end, y: 0 },
    { x: width, y: 0 },
    { x: width, y: height },
    { x: 0, y: height },
    { x: 0, y: 0 },
  ]);
  console.log({ left, tab, right });
  return `${left} ${tab} ${right}`;
};
interface TabbarProps {}

// eslint-disable-next-line react/prefer-stateless-function
export default class Tabbar extends React.PureComponent<TabbarProps> {
  render() {
    const d = getPath(1);
    console.log({ d });
    return (
      <>
        <Svg {...{ width, height }}>
          <Path fill={backgroundColor} {...{ d }} />
        </Svg>
        <SafeAreaView style={styles.container} />
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor,
  },
});
