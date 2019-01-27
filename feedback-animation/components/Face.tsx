import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { DangerZone } from "expo";
import Mouth from "./Mouth";
import Eye from "./Eye";

import { interpolateColors } from "./AnimationHelpers";

const { width } = Dimensions.get("window");
const radius = (width / 5 - 8) / 2;
const { Animated } = DangerZone;
const {
  Value, Extrapolate, interpolate, sub, add,
} = Animated;

interface FaceProps {
  happiness: Value,
  slider?: Value | null
}

export default class Face extends React.PureComponent<FaceProps> {
  static defaultProps = {
    slider: null,
  };

  render() {
    const { happiness, slider } = this.props;
    const inputRange = [0, 0.5];
    const outputRange = ["#f4b899", "#fadf97"];
    const backgroundColor = slider !== null ? "#c9ced2" : interpolateColors(happiness, inputRange, outputRange);
    const scale = slider === null ? 1 : interpolate(slider, {
      inputRange: [sub(happiness, 0.1), happiness, add(happiness, 0.1)],
      outputRange: [0.75, 0, 0.75],
      extrapolate: Extrapolate.CLAMP,
    });
    return (
      <View style={styles.container}>
        <Animated.View style={[styles.face, { backgroundColor, transform: [{ scale }] }]}>
          <View style={styles.eyes}>
            <Eye />
            <Eye />
          </View>
          <View style={styles.mouth}>
            <Mouth {...{ happiness }} />
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: width / 5,
    justifyContent: "center",
    alignItems: "center",
  },
  face: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
  },
  eyes: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  mouth: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
