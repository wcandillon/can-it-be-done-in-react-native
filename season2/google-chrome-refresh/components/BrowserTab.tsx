import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { DangerZone } from "expo";

import Interactable from "./Interactable";
import Content from "./Content";
import Header from "./Header";

const { Animated } = DangerZone;
const { Value, debug, block } = Animated;
const { height } = Dimensions.get("window");

interface BrowserTabProps {}

// eslint-disable-next-line react/prefer-stateless-function
export default class BrowserTab extends React.PureComponent<BrowserTabProps> {
  x = new Value(0);

  y = new Value(0);

  render() {
    const { x, y } = this;
    const snapPoints = [{ x: 0 }];
    const gravityPoints = [{
      x: 0, y: 0, strength: 5000, falloff: height, damping: 0.5,
    }];
    return (
      <View>
        <Animated.Code>
          {
            () => block([
              debug("x", x),
              debug("y", y),
            ])
          }
        </Animated.Code>
        <View style={styles.background} />
        <Interactable
          style={styles.container}
          animatedValueX={x}
          animatedValueY={y}
          verticalOnly
          {...{
            snapPoints, gravityPoints,
          }}
        >
          <Header {...{ x, y }} />
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
