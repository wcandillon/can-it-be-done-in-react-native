import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginRight: 8,
    backgroundColor: "#e2e3e4",
    padding: 8,
    alignItems: "center",
    borderRadius: 16,
  },
  text: {
    fontFamily: "UberMoveRegular",
    fontSize: 16,
    lineHeight: 22,
    marginLeft: 8,
  },
});

interface OptionProps {
  icon: string;
  label: string;
  selected?: boolean;
}

const Option = ({ icon, label, selected }: OptionProps) => {
  const backgroundColor = selected ? "black" : "#e2e3e4";
  const color = selected ? "white" : "black";
  return (
    <View style={[styles.container, { backgroundColor }]}>
      <Icon name={icon} size={16} {...{ color }} />
      <Text style={[styles.text, { color }]}>{label}</Text>
    </View>
  );
};

export default Option;
