import * as React from "react";
import {
  View, Text, StyleSheet, TouchableWithoutFeedback,
} from "react-native";

export const BUTTON_HEIGHT = 48;
export const BUTTON_WIDTH = 200;

export default () => (
  <TouchableWithoutFeedback>
    <View style={styles.button}>
      <Text style={styles.label}>SHUFFLE PLAY</Text>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  button: {
    alignSelf: "center",
    backgroundColor: "#1ed760",
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    borderRadius: 32,
    justifyContent: "center",
  },
  label: {
    color: "white",
    fontSize: 14,
    textAlign: "center",
    fontWeight: "600",
  },
});
