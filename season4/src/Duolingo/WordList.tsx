import React, { ReactElement } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

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
  const offsets = children.map((id) => ({
    id,
    offset: { width: 0, height: 0 },
  }));
  return (
    <View style={styles.container}>
      {children.map((child, i) => (
        <View
          key={i}
          onLayout={({
            nativeEvent: {
              layout: { width, height },
            },
          }) => (offsets[i].offset = { width, height })}
        >
          {child}
        </View>
      ))}
    </View>
  );
};

export default WordList;
