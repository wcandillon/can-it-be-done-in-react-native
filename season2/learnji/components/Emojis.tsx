import * as React from "react";
import {
  View, Text, StyleSheet,
} from "react-native";
import { DangerZone } from "expo";

import {
  Emojis, EMOJI_WIDTH, EMOJIS_OFFSET, FONT_SIZE, PADDING,
} from "./Model";

const { Animated } = DangerZone;
const {
  Value, interpolate, Extrapolate,
} = Animated;

interface EmojisProps {
  emojis: Emojis;
  x: typeof Value;
}

export default class extends React.PureComponent<EmojisProps> {
  render() {
    const { emojis, x } = this.props;
    return (
      <View style={styles.container}>
        <Animated.View style={styles.emojis}>
          {
            Object.keys(emojis).map((emoji, i) => {
              const previousPosition = EMOJI_WIDTH * (i - 1);
              const currentPosition = EMOJI_WIDTH * i;
              const nextPosition = EMOJI_WIDTH * (i + 1);
              const inputRange = [previousPosition, currentPosition, nextPosition];
              const translateX = interpolate(x, {
                inputRange: [0, EMOJI_WIDTH],
                outputRange: [EMOJIS_OFFSET, EMOJIS_OFFSET + (-1 * EMOJI_WIDTH)],
              });
              const scale = interpolate(x, {
                inputRange,
                outputRange: [1, 1.3, 1],
                extrapolate: Extrapolate.CLAMP,
              });
              const opacity = interpolate(x, {
                inputRange,
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
                    style={{ fontSize: FONT_SIZE }}
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
  }
}

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
    padding: PADDING,
  },
});
