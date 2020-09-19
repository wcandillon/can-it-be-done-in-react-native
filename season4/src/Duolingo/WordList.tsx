/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactElement, useState } from "react";
import { View, StyleSheet, Dimensions, LayoutChangeEvent } from "react-native";
import { useSharedValue, runOnUI } from "react-native-reanimated";

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
  children: ReactElement<{ id: number; word: string }>[];
}

const WordList = ({ children }: WordListProps) => {
  const [ready, setReady] = useState(false);
  const offsets = children.map(() => ({
    order: useSharedValue(0),
    width: useSharedValue(0),
    height: useSharedValue(0),
    x: useSharedValue(0),
    y: useSharedValue(0),
    id: useSharedValue(""),
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
            offsets[index].order.value = index;
            offsets[index].width.value = width;
            offsets[index].height.value = height;
            offsets[index].id.value = child.props.word;
            runOnUI(() => {
              "worklet";
              if (
                offsets.filter((offset) => offset.width.value === 0).length ===
                0
              ) {
                calculateLayout(offsets, containerWidth);
                setReady(true);
              }
            })();
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
        <SortableWord
          key={index}
          offsets={offsets}
          index={index}
          containerWidth={containerWidth}
        >
          {child}
        </SortableWord>
      ))}
    </View>
  );
};

export default WordList;
