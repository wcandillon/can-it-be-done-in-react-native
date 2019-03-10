import * as React from "react";
import {
  SafeAreaView, StyleSheet, Dimensions,
} from "react-native";
import { path } from "d3-path";

import { Svg } from "expo";

const { width } = Dimensions.get("window");
const height = 64;
const { Path } = Svg;

const d = path();
d.moveTo(0, 0);
d.lineTo(width, 0);
d.lineTo(width, height);
d.lineTo(0, height);
d.lineTo(0, 0);

interface TabbarProps {}

// eslint-disable-next-line react/prefer-stateless-function
export default class Tabbar extends React.PureComponent<TabbarProps> {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Svg {...{ width, height }}>
          <Path d={d.toString()} fill="blue" />
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
