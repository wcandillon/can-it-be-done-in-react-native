import React, { ComponentProps } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

import { SIZE } from "./StaticTabbar";

interface RowProps {
  label: string;
  icon: ComponentProps<typeof Icon>["name"];
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  label: {
    color: "white",
    textAlign: "center",
    fontSize: 18,
    fontFamily: "GothamRounded-Medium",
    marginRight: 8,
  },
});

const Row = ({ label, icon }: RowProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Icon name={icon} color="white" size={24} />
    </View>
  );
};

export default Row;
