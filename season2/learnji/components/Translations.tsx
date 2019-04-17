import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { DangerZone } from "expo";
import { Emojis } from "./Model";

const { Animated } = DangerZone;
const {
  Value, debug, multiply, max,
} = Animated;
const { height } = Dimensions.get("window");

interface TranslationsProps {
  y: typeof Value;
  emojis: Emojis;
  max: number;
}

export default class Translations extends React.PureComponent<TranslationsProps> {
  render() {
    const { y, max: maxVal } = this.props;
    console.log(maxVal);
    const translateY = max(multiply(y, -1), maxVal);
    return (
      <Animated.View style={{
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "red",
        transform: [{ translateY }],
      }}
      >
        <Animated.Code>
          {
            () => debug("translateY", translateY)
          }
        </Animated.Code>
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
