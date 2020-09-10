import React, { ReactElement } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { useSharedValue } from "react-native-reanimated";

import SortableWord from "./SortableWord";

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
  const offsets = useSharedValue(children.map(() => ({ width: 0, height: 0 })));
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
