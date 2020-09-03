import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { RectButton } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  button: {
    width: width / 4,
    height: width / 4,
    borderRadius: 8,
  },
  dot: { width: 20, height: 20, borderRadius: 10 },
});

interface ButtonProps {
  backgroundColor: string;
  onPress: () => void;
}

const Button = ({ backgroundColor, onPress }: ButtonProps) => {
  return (
    <RectButton onPress={onPress} style={styles.button}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={[styles.dot, { backgroundColor }]} />
      </View>
    </RectButton>
  );
};

export default Button;
