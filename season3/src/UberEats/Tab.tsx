import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    marginRight: 8
  },
  text: {
    fontSize: 14,
    fontFamily: "UberMoveRegular"
  }
});

interface TabProps {
  color: string;
  backgroundColor: string;
  name: string;
}

export default ({ name, color, backgroundColor }: TabProps) => {
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Text style={[styles.text, { color }]}>{name}</Text>
    </View>
  );
};
