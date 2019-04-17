import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { DangerZone } from "expo";
import { Emojis } from "./Model";

const { Animated } = DangerZone;
const {
  Value, debug, multiply, max,
} = Animated;
const { height, width } = Dimensions.get("window");

interface TranslationsProps {
  y: typeof Value;
  emojis: Emojis;
  max: number;
}

export default class Translations extends React.PureComponent<TranslationsProps> {
  render() {
    const { y, x, max: maxVal } = this.props;
    const translateY = max(multiply(y, -1), maxVal);
    const translateX = multiply(x, -1);
    return (
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          flexDirection: "row",
          transform: [{ translateY }, { translateX }],
        }}
        horizontal
        snapPoint={width}
      >
        <View style={{ width, height: "100%", backgroundColor: "yellow" }} />
        <View style={{ width, height: "100%", backgroundColor: "green" }} />
        <View style={{ width, height: "100%", backgroundColor: "red" }} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "red",
  },
});
