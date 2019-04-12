import React from "react";
import {
  StyleSheet, View, Dimensions,
} from "react-native";
import { DangerZone } from "expo";

import Emojis, { EMOJI_WIDTH, EMOJIS_OFFSET } from "./components/Emojis";
import { onScroll } from "./components/AnimationHelpers";

const { Animated } = DangerZone;
const { Value } = Animated;
const emojis = require("./assets/emoji-db.json");

const { height } = Dimensions.get("window");
const horizontalPanHeight = EMOJI_WIDTH;
const verticalPanHeight = height / 2 - horizontalPanHeight / 2;
const numberOfEmojis = Object.keys(emojis).length;


export default () => {
  const x = new Value(0);
  const y = new Value(0);
  return (
    <View style={styles.container}>
      <Emojis {...{ emojis, x, y }} />
      <Animated.ScrollView
        style={styles.verticalPan}
        contentContainerStyle={styles.verticalPanContent}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll({ y })}
        scrollEventThrottle={1}
        vertical
      />
      <Animated.ScrollView
        style={styles.horizontalPan}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: EMOJI_WIDTH * numberOfEmojis }}
        onScroll={onScroll({ x })}
        scrollEventThrottle={1}
        snapToInterval={EMOJI_WIDTH}
        decelerationRate="fast"
        horizontal
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  verticalPan: {
    position: "absolute",
    top: 0,
    left: 0,
    height: verticalPanHeight,
  },
  verticalPanContent: {
    width: verticalPanHeight * 2 + EMOJIS_OFFSET * 2,
  },
  horizontalPan: {
    position: "absolute",
    top: verticalPanHeight,
    left: 0,
    height: horizontalPanHeight,
  },
});
