import * as _ from "lodash";
import React from "react";
import {
  StyleSheet, View, Dimensions,
} from "react-native";
import { DangerZone, Constants } from "expo";

import Emojis from "./components/Emojis";
import { EMOJI_WIDTH, EMOJIS_OFFSET } from "./components/Model";
import Translations from "./components/Translations";
import { onScroll, lookup } from "./components/AnimationHelpers";
import AnimatedText from "./components/AnimatedText";

const { Animated } = DangerZone;
const {
  Value, block, call, divide, round, cond, neq, diff, set, onChange,
} = Animated;
const emojis = require("./assets/emoji-db.json");

const emojiList = Object.keys(emojis);

const { height, width } = Dimensions.get("window");
const horizontalPanHeight = EMOJI_WIDTH;
const verticalPanHeight = height / 2 - horizontalPanHeight / 2;
const numberOfEmojis = emojiList.length;
const numberOfLanguages = Object.keys(emojis[emojiList[0]]).length;

export default () => {
  const translations = {
    en: new Value(emojis[emojiList[0]].en),
    de: new Value(emojis[emojiList[0]].de),
    it: new Value(emojis[emojiList[0]].it),
    fr: new Value(emojis[emojiList[0]].fr),
    es: new Value(emojis[emojiList[0]].es),
    pt: new Value(emojis[emojiList[0]].pt),
    zhHant: new Value(emojis[emojiList[0]].zh_Hant),
    ko: new Value(emojis[emojiList[0]].ko),
    ja: new Value(emojis[emojiList[0]].ja),
  };
  const slider = new Value(0);
  const x = new Value(0);
  const y = new Value(0);
  const index = round(divide(x, EMOJI_WIDTH));
  return (
    <View style={styles.container}>
      <Animated.Code>
        {
          () => onChange(index,
            Object.keys(translations)
              .map(lang => set(translations[lang], lookup(emojiList.map(emoji => emojis[emoji].de), index))))
        }
      </Animated.Code>
      <View style={styles.container}>
        <Translations
          max={(verticalPanHeight - 150) * -1}
          x={slider}
          {...{ emojis, y, translations }}
        />
      </View>
      <Emojis {...{ emojis, x }} />
      <View style={styles.container}>
        <AnimatedText style={styles.english} text={translations.en} />
      </View>
      <Animated.ScrollView
        style={styles.verticalPan}
        contentContainerStyle={styles.verticalPanContent}
        showsVerticalScrollIndicator={false}
        onScroll={onScroll({ y })}
        scrollEventThrottle={1}
        vertical
      >
        <Animated.ScrollView
          style={StyleSheet.absoluteFillObject}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: width * (numberOfLanguages - 1) }}
          onScroll={onScroll({ x: slider })}
          scrollEventThrottle={1}
          snapToInterval={width}
          decelerationRate="fast"
          horizontal
        />
      </Animated.ScrollView>
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
    height: verticalPanHeight * 2,
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
  english: {
    margin: 48,
    textAlign: "center",
    fontSize: 48,
    color: "black",
    fontWeight: "bold",
  },
});
