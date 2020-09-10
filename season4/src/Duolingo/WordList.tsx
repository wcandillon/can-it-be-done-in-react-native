/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactElement, useState, useRef } from "react";
import { View, StyleSheet, Dimensions, LayoutChangeEvent } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import SortableWord from "./SortableWord";
import { calculateLayout } from "./Layout";

const margin = 32;
const containerWidth = Dimensions.get("window").width - margin * 2;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin,
  },
});

interface WordListProps {
  children: ReactElement<{ id: number }>[];
}

const WordList = ({ children }: WordListProps) => {
  const [ready, setReady] = useState(false);
  const offsets = children.map(() => ({
    width: useRef(0),
    height: useRef(0),
    x: useSharedValue(0),
    y: useSharedValue(0),
  }));
  if (!ready) {
    return (
      <View style={styles.container}>
        {children.map((child, index) => {
          const onLayout = ({
            nativeEvent: {
              layout: { width, height },
            },
          }: LayoutChangeEvent) => {
            offsets[index].width.current = width;
            offsets[index].height.current = height;
            if (
              offsets.filter((offset) => offset.width.current === 0).length ===
              0
            ) {
              calculateLayout(offsets, containerWidth);
              setReady(true);
            }
          };
          return (
            <View key={index} onLayout={onLayout}>
              {child}
            </View>
          );
        })}
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {children.map((child, index) => (
        <SortableWord key={index} offsets={offsets} index={index}>
          {child}
        </SortableWord>
      ))}
    </View>
  );
};

export default WordList;
