import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface ScreenProps {
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16
  },
  button: {
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 20,
    padding: 16
  },
  label: {
    fontSize: 16,
    fontWeight: "500"
  }
});

export default ({ onPress }: ScreenProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity {...{ onPress }}>
        <View style={styles.button}>
          <Text style={styles.label}>Show Menu</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
