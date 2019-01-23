/* eslint-disable max-len */
import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { DangerZone } from "expo";

import Eye from "./Eye";
import Mouth from "./Mouth";
import { interpolateColors } from "./AnimationHelpers";

const { Animated } = DangerZone;
const { Value } = Animated;
const { width } = Dimensions.get("window");
const radius = width / 10 - 8;

interface StatusProps {
  x: Value,
  inputRange: number[]
}

export default class Status extends React.PureComponent<StatusProps> {
  render() {
    const { x, inputRange } = this.props;
    const outputRange = [
      "rgb(244, 199, 164)",
      "rgb(246, 210, 163)",
      "rgb(249, 223, 160)",
      "rgb(249, 223, 160)",
      "rgb(249, 223, 160)",
    ];
    const backgroundColor = interpolateColors(x, inputRange, outputRange);
    return (
      <View style={styles.faceContainer}>
        <Animated.View style={[styles.face, { backgroundColor }]}>
          <View style={styles.eyes}>
            <Eye {...{ x }} />
            <View style={styles.rightEye}>
              <Eye {...{ x }} />
            </View>
          </View>
          <View style={styles.mouth}>
            <Mouth {...{ x }} />
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  faceContainer: {
    width: width / 5,
    alignItems: "center",
  },
  face: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    justifyContent: "space-evenly",
  },
  eyes: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  rightEye: {
    transform: [{ rotateY: "180deg" }],
  },
  mouth: {
    justifyContent: "center",
    alignItems: "center",
  },
});
