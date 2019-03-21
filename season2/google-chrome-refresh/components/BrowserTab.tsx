import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { DangerZone } from "expo";

import Interactable from "./Interactable";
import Content from "./Content";
import Header from "./Header";

const { Animated } = DangerZone;
const { Value, multiply } = Animated;
const { height } = Dimensions.get("window");

interface BrowserTabProps {}

// eslint-disable-next-line
export default class BrowserTab extends React.PureComponent<BrowserTabProps> {
  render() {
    const x = new Value(0);
    const y = new Value(0);
    const snapPoints = [{ x: 0 }];
    const gravityPoints = [{
      x: 0, y: 0, strength: 5000, falloff: height, damping: 0.5,
    }];
    return (
      <View>
        <View style={styles.background} />
        <Animated.View style={{ transform: [{ translateX: multiply(x, -1) }] }}>
          <Interactable
            style={styles.container}
            animatedValueX={x}
            animatedValueY={y}
            {...{ gravityPoints, snapPoints }}
          >
            <Header {...{ x, y }} />
            <Content />
          </Interactable>
        </Animated.View>
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
