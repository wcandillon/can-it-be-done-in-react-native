import React from "react";
import { StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "./Button";

const styles = StyleSheet.create({
  actions: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

const Footer = () => {
  const insets = useSafeAreaInsets();
  return (
    <View>
      <View style={styles.actions}>
        <Button icon="repeat" label="Swap" />
        <Button icon="send" label="Send" />
      </View>
      <View style={{ height: insets.bottom }} />
    </View>
  );
};

export default Footer;
