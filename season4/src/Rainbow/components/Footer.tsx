import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import Button from "./Button";

const styles = StyleSheet.create({
  balance: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actions: {
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "grey",
  },
  value: {
    color: "black",
    fontSize: 24,
  },
});

const Footer = () => {
  const insets = useSafeAreaInsets();
  return (
    <View>
      <View style={styles.balance}>
        <View>
          <Text style={styles.label}>Balance</Text>
          <Text style={styles.value}>0.002 ETH</Text>
        </View>
        <View>
          <Text style={styles.label}>Value</Text>
          <Text style={styles.value}>$8.12</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <Button icon="repeat" label="Swap" />
        <Button icon="send" label="Send" />
      </View>
      <View style={{ height: insets.bottom }} />
    </View>
  );
};

export default Footer;
