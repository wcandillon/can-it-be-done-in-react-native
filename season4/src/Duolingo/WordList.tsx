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
    flex: 1,
    margin,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
});

interface WordListProps {
  children: ReactElement<{ id: number }>[];
}

const WordList = ({ children }: WordListProps) => {
  const [ready, setReady] = useState(false);
  const offsets = children.map(() => ({
    order: useSharedValue(0),
    width: useSharedValue(0),
    height: useSharedValue(0),
    x: useSharedValue(0),
    y: useSharedValue(0),
    originalX: useSharedValue(0),
    originalY: useSharedValue(0),
    used: useSharedValue(false),
  }));
  if (!ready) {
    return (
      <View style={styles.row}>
        {children.map((child, index) => {
          const onLayout = ({
            nativeEvent: {
              layout: { width, height, x, y },
            },
          }: LayoutChangeEvent) => {
            const offset = offsets[index];
            offset.order.value = -1;
            offset.width.value = width;
            offset.height.value = height;
            offset.originalX.value = x;
            offset.originalY.value = y;
            runOnUI(() => {
              "worklet";
              if (offsets.filter((o) => o.width.value === 0).length === 0) {
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
