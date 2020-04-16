import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather as Icon } from "@expo/vector-icons";

import Logo from "./Logo";

export const HEADER_HEIGHT = 64;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FAF9F9",
    paddingBottom: 0,
    borderBottomWidth: 1,
    borderColor: "#DADADA",
  },
  content: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    height: HEADER_HEIGHT,
  },
});

export default () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Icon name="camera" size={24} />
        <Logo />
        <Icon name="send" size={24} />
      </View>
    </SafeAreaView>
  );
};
