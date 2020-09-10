import React from "react";
import { View, Text, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {},
  text: {},
});

export interface WordProps {
  id: number;
  word: string;
}

const Word = ({ word }: WordProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{word}</Text>
    </View>
  );
};

export default Word;
