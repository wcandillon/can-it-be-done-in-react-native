import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import Interactable from "./Interactable";
import Content from "./Content";
import Header from "./Header";

const { height } = Dimensions.get("window");

interface BrowserTabProps {}

// eslint-disable-next-line react/prefer-stateless-function
export default class BrowserTab extends React.PureComponent<BrowserTabProps> {
  render() {
    const snapPoints = [{ x: 0 }];
    const gravityPoints = [{
      x: 0, y: 0, strength: 5000, falloff: height, damping: 0.5,
    }];
    return (
      <View>
        <View style={styles.background} />
        <Interactable
          style={styles.container}
          verticalOnly
          {...{
            snapPoints, gravityPoints,
          }}
        >
          <Header />
          <Content />
        </Interactable>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#f0f1f2",
  },
});
