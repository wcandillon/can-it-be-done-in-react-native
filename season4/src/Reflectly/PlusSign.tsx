import React from "react";
import { StyleSheet, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#02CBD6",
    padding: 24,
    borderRadius: 32,
    top: -32,
  },
});

const PlusSign = () => {
  return (
    <View style={styles.container}>
      <Icon name="x" color="white" size={32} />
    </View>
  );
};

export default PlusSign;
