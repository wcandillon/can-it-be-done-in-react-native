import React from "react";
import { StyleSheet, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

const size = 30;
const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    backgroundColor: "#525251",
    justifyContent: "center",
    alignItems: "center"
  }
});

interface ChevronProps {
  open: boolean;
}

export default ({ open }: ChevronProps) => {
  const rotateZ = open ? "0deg" : "180deg";
  return (
    <View style={[styles.container, { transform: [{ rotateZ }] }]}>
      <Icon name="chevron-down" color="white" size={24} />
    </View>
  );
};
