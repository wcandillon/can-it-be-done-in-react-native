import React from "react";
import {
  StyleSheet, View, Dimensions,
} from "react-native";
import { DangerZone } from "expo";

import Emojis from "./components/Emojis";
import { EMOJI_WIDTH, EMOJIS_OFFSET } from "./components/Model";
import EnglishWord from "./components/EnglishWord";
import Translations from "./components/Translations";
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
      <View style={styles.container}>
        <Translations {...{ emojis, y }} />
      </View>
      <Emojis {...{ emojis, x }} />
      <View style={styles.container}>
        <EnglishWord {...{ x, emojis }} />
      </View>
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
        contentContainerStyle={styles.horizontalPanContent}
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
    right: 0,
    height: verticalPanHeight,
  },
  verticalPanContent: {
    height: (verticalPanHeight + EMOJIS_OFFSET) * 2,
  },
  horizontalPan: {
    position: "absolute",
    top: verticalPanHeight,
    left: 0,
    height: horizontalPanHeight,
  },
  horizontalPanContent: {
    width: EMOJI_WIDTH * numberOfEmojis,
  },
});
