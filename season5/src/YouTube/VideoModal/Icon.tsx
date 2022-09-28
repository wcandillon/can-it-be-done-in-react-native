import type { ComponentProps } from "react";
import React from "react";
import { View, StyleSheet, Text } from "react-native";
import ExpoIcon from "@expo/vector-icons/Feather";

interface IconProps {
  name: ComponentProps<typeof ExpoIcon>["name"];
  label: string;
}

export const Icon = ({ name, label }: IconProps) => {
  return (
    <View style={styles.container}>
      <ExpoIcon style={styles.icon} name={name} />
      <Text style={styles.label}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  icon: {
    fontSize: 24,
    color: "gray",
  },
  label: {
    color: "gray",
    textAlign: "center",
    marginTop: 8,
  },
});
