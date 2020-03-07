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
  }
});

export default ({ onPress }: ScreenProps) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity {...{ onPress }}>
        <Text>Show Menu</Text>
      </TouchableOpacity>
    </View>
  );
};
