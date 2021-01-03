import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Cross from "./Cross";
import Heart from "./Heart";
import Progress from "./Progress";
import Character from "./Character";

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  title: {
    fontFamily: "Nunito-Bold",
    fontSize: 24,
    paddingLeft: 16,
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
