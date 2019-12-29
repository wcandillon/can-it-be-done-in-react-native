import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    padding: 12
  },
  top: {
    flex: 1,
    alignItems: "center"
  },
  middle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  bottom: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end"
  },
  menu: {
    color: "white",
    textAlign: "center",
    fontWeight: "700"
  }
});

export default () => {
  return (
    <View style={styles.container} pointerEvents="none">
      <View style={styles.top}>
        <Text style={styles.menu}>MENU</Text>
      </View>
      <View style={styles.middle}>
        <Icon name="skip-backward" color="white" size={24} />
        <Icon name="skip-forward" color="white" size={24} />
      </View>
      <View style={styles.bottom}>
        <Icon name="play-pause" color="white" size={24} />
      </View>
    </View>
  );
};
