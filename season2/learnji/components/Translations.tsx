import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { DangerZone } from "expo";
import { Emojis } from "./Model";

const { Animated } = DangerZone;
const { Value, debug } = Animated;
const { height } = Dimensions.get("window");

interface TranslationsProps {
  y: typeof Value;
  emojis: Emojis;
}

export default class Translations extends React.PureComponent<TranslationsProps> {
  render() {
    const { y: translateY } = this.props;
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
