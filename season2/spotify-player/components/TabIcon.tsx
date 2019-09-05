import React from "react";
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather as Icon } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

interface TabIconProps {
  onPress: () => void;
  name: string;
}

export default ({ name, onPress }: TabIconProps) => {
  return (
    <RectButton {...{ onPress }} style={styles.container}>
      <Icon {...{ name }} size={24} color="white" />
    </RectButton>
  );
};
