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

const getPath = (index: number): string => shape.line()
  .x(d => d.x)
  .y(d => d.y)
  .curve(shape.curveBasis)([
    { x: 0, y: 0 },
    { x: 0 + 10, y: 10 },
    { x: 0 + 10 + 10, y: height },
    { x: 0 + tabWidth - 20, y: height },
    { x: 0 + tabWidth - 10, y: 10 },
    { x: tabWidth, y: 0 },
  ]);
interface TabbarProps {}

// eslint-disable-next-line react/prefer-stateless-function
export default class Tabbar extends React.PureComponent<TabbarProps> {
  render() {
    const d = `${getPath(0)}L375,0L375,64L0,64`;
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
