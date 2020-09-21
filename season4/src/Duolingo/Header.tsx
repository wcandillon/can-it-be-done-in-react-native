import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Cross from "./components/Cross";
import Heart from "./components/Heart";
import Progress from "./components/Progress";
import Character from "./components/Character";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    paddingLeft: 16,
    marginBottom: 16,
  },
});

const Header = () => {
  return (
    <View>
      <View style={styles.row}>
        <Cross />
        <Progress />
        <Heart />
      </View>
      <Text style={styles.title}>Translate this sentence</Text>
      <Character />
    </View>
  );
};

export default Header;
