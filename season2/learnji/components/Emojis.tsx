import * as React from "react";
import {
  View, Text, StyleSheet, Dimensions,
} from "react-native";
import { DangerZone } from "expo";

const { Animated } = DangerZone;
const {
  Value, event, interpolate, Extrapolate,
} = Animated;
const { width } = Dimensions.get("window");

const padding = 4;
const fontSize = 92;
export const EMOJI_WIDTH = fontSize + padding * 2;
export const EMOJIS_OFFSET = (width - EMOJI_WIDTH) / 2;

interface Emoji {
  "de": string;
  "it": string;
  "fr": string;
  "es": string;
  "en": string;
  "pt": string;
  "zh_Hant": string;
  "ko": string;
  "ja": string;
}

interface Emojis {
  [emoji: string]: Emoji
}

interface EmojisProps {
  emojis: Emojis;
  x: Value;
  y: Value;
}

export default ({
  emojis, x, y,
}: EmojisProps) => (
  <View style={styles.container}>
    <Animated.View style={styles.emojis}>
      {
        Object.keys(emojis).map((emoji, index) => {
          const translateX = interpolate(x, {
            inputRange: [0, EMOJI_WIDTH],
            outputRange: [EMOJIS_OFFSET, EMOJIS_OFFSET + (-1 * EMOJI_WIDTH)],
          });
          const scale = interpolate(x, {
            inputRange: [EMOJI_WIDTH * (index - 1), EMOJI_WIDTH * index, EMOJI_WIDTH * (index + 1)],
            outputRange: [1, 1.3, 1],
            extrapolate: Extrapolate.CLAMP,
          });
          const opacity = interpolate(x, {
            inputRange: [EMOJI_WIDTH * (index - 1), EMOJI_WIDTH * index, EMOJI_WIDTH * (index + 1)],
            outputRange: [0.5, 1, 0.5],
            extrapolate: Extrapolate.CLAMP,
          });
          return (
            <Animated.View
              key={emoji}
              style={[styles.emoji, {
                opacity,
                transform: [
                  { translateX },
                  { scale },
                ],
              }]}
            >
              <Text
                style={{ fontSize }}
              >
                {emoji}
              </Text>
            </Animated.View>
          );
        })
      }
    </Animated.View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  emojis: {
    flexDirection: "row",
  },
  emoji: {
    width: EMOJI_WIDTH,
    padding,
  },
});
