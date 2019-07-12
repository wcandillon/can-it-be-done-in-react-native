import * as React from "react";
import { View, StyleSheet } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    height: 64,
    flexDirection: "row",
    justifyContent: "space-between"
  }
});

export default () => {
  return (
    <View style={styles.container}>
      <Icon name="menu" color="white" size={24} />
      <Icon name="search" color="white" size={24} />
    </View>
  );
};
