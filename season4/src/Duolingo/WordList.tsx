import React, { ReactElement, useEffect } from "react";
import { View, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    margin: 32,
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
