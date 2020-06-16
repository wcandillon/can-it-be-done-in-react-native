import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: "#e2e3e4",
  },
  body: {
    fontFamily: "UberMoveRegular",
    fontSize: 16,
    lineHeight: 22,
  },
  icon: {
    marginRight: 16,
  },
});

interface RowProps {
  label: string;
  icon: string;
  first?: boolean;
}

const Row = ({ label, icon, first }: RowProps) => {
  const borderBottomWidth = first ? 0 : StyleSheet.hairlineWidth;
  return (
    <View style={[styles.container, { borderBottomWidth }]}>
      <Icon name={icon} style={styles.icon} size={16} />
      <Text style={styles.body}>{label}</Text>
    </View>
  );
};

export default Row;
