import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import Interactable from "./Interactable";

const { width, height } = Dimensions.get("window");

interface HeaderProps {}

export default class Header extends React.PureComponent<HeaderProps> {
  render() {
    const snapPoints = [{ x: 0 }];
    const gravityPoints = [{
      x: 0, y: 0, strength: 5000, falloff: height, damping: 0.5,
    }];
    return (
      <Interactable
        style={styles.container}
        verticalOnly
        {...{
          snapPoints, gravityPoints,
        }}
      >
        <View />
      </Interactable>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -height + 128,
    justifyContent: "flex-end",
    backgroundColor: "#f6f7f8",
    height,
    width,
  },
});
