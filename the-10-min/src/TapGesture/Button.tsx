import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import { MaterialCommunityIcons as Icon } from "@expo/vector-icons";
import { bInterpolate } from "react-native-redash";
import { StyleGuide } from "../components";

const SIZE = 100;

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  }
});

interface ButtonProps {
  progress: Animated.Node<number>;
}

//  check-circle
//
export default ({ progress }: ButtonProps) => {
  const height = bInterpolate(progress, 0, SIZE);
  return (
    <View style={styles.container}>
      <Icon
        name="fingerprint"
        color={StyleGuide.palette.background}
        size={72}
      />
      <Animated.View
        style={{
          ...StyleSheet.absoluteFillObject,
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          height
        }}
      >
        <Icon name="fingerprint" color={StyleGuide.palette.primary} size={72} />
      </Animated.View>
    </View>
  );
};
