import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-evenly",
    borderTopRightRadius: 32,
    borderTopLeftRadius: 32,
    paddingTop: 32,
  },
});
export const SIZE = width / 5;

const StaticTabbar = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.container, { paddingBottom: 16 + insets.bottom }]}>
      <Icon name="copy" color="#B9B9C7" size={24} />
      <Icon name="activity" color="#B9B9C7" size={24} />
      <Icon name="x" color="#B9B9C7" size={24} />
      <Icon name="edit-3" color="#B9B9C7" size={24} />
      <Icon name="user" color="#B9B9C7" size={24} />
    </View>
  );
};

export default StaticTabbar;
