import React from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";

import { Offset } from "./Layout";
import Word from "./Word";

interface DebugProps {
  offsets: Offset[];
  words: { id: number; word: string }[];
}

const Debug = ({ offsets, words }: DebugProps) => {
  return (
    <View pointerEvents="none" style={{ top: 100 }}>
      {words.map(({ word, id }, i) => {
        const offset = offsets[i];
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const style = useAnimatedStyle(() => ({
          position: "absolute",
          top: 0,
          left: 0,
          width: offset.width.value,
          height: offset.height.value,
          transform: [
            { translateX: offset.x.value },
            { translateY: offset.y.value },
          ],
        }));
        return (
          <Animated.View key={id} style={style}>
            <Word word={word} id={id} />
          </Animated.View>
        );
      })}
    </View>
  );
};

export default Debug;
