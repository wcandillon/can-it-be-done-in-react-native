import * as React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { RectButton } from "react-native-gesture-handler";

import StyleGuide from "./StyleGuide";
import Text from "./Text";

interface ButtonProps {
  label: string;
  primary?: boolean;
  onPress: () => void;
}

const styles = StyleSheet.create({
  container: {
    padding: StyleGuide.spacing * 2,
  },
  label: {
    textAlign: "center",
  },
});

const Button = ({ label, primary, onPress }: ButtonProps) => {
  const color = primary ? "white" : undefined;
  const backgroundColor = primary ? StyleGuide.palette.primary : undefined;
  return (
    <RectButton {...{ onPress }}>
      <SafeAreaView style={{ backgroundColor }} accessible>
        <View style={styles.container}>
          <Text type="headline" style={[styles.label, { color }]}>
            {label}
          </Text>
        </View>
      </SafeAreaView>
    </RectButton>
  );
};

export default Button;
