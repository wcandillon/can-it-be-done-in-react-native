import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  label: {
    fontSize: 20,
    color: "grey"
  },
  value: {
    fontSize: 20,
    fontVariant: ["tabular-nums"]
  }
});

interface RowProps {
  label: string;
  value: string;
  color?: string;
}

export default ({ label, value, color }: RowProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Text style={[styles.value, { color: color || "white" }]}>{value}</Text>
    </View>
  );
};
