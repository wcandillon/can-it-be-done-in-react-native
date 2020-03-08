import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { bInterpolate } from "react-native-redash";
import Animated from "react-native-reanimated";

interface ScreenProps {
  open: Animated.Value<number>;
  transition: Animated.Node<number>;
  triggeredManually: Animated.Value<0 | 1>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: "#F6F5F9"
  },
  button: {
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 20,
    padding: 16
  },
  label: {
    fontSize: 16,
    fontWeight: "500"
  }
});

export default ({ open, transition, triggeredManually }: ScreenProps) => {
  const borderRadius = bInterpolate(transition, 0, 20);
  return (
    <Animated.View style={[styles.container, { borderRadius }]}>
      <TouchableOpacity
        onPress={() => {
          triggeredManually.setValue(0);
          open.setValue(1);
        }}
      >
        <View style={styles.button}>
          <Text style={styles.label}>Show Menu</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};
