import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather as Icon } from "@expo/vector-icons";

export const FOOTER_HEIGHT = 64;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAF9F9",
    paddingTop: 0,
    borderTopWidth: 1,
    borderColor: "#DADADA"
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    height: FOOTER_HEIGHT
  }
});

export default () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Icon name="home" size={24} />
        <Icon name="search" size={24} />
        <Icon name="plus-square" size={24} />
        <Icon name="heart" size={24} />
        <Icon name="user" size={24} />
      </View>
    </SafeAreaView>
  );
};
