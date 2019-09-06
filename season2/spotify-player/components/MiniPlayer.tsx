import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#272829",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16
  },
  text: {
    color: "white"
  }
});

export default () => {
  return (
    <View style={styles.container}>
      <Icon name="heart" color="white" size={24} />
      <Text style={styles.text}>Metronomy - The Bay</Text>
      <Icon name="play-circle" color="white" size={24} />
    </View>
  );
};
