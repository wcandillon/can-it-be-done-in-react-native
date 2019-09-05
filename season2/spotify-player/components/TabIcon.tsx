import React from "react";
import { StyleSheet, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  label: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
    textAlign: "center"
  }
});

interface TabIconProps {
  onPress?: () => void;
  name: string;
  label: string;
}

export default ({ name, onPress, label }: TabIconProps) => {
  return (
    <RectButton {...{ onPress }} style={styles.container}>
      <Icon {...{ name }} size={24} color="white" />
      <Text style={styles.label}>{label}</Text>
    </RectButton>
  );
};
