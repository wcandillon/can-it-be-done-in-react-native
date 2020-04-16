import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Animated, { color } from "react-native-reanimated";
import { Feather as Icon } from "@expo/vector-icons";
import { colorForBackground, hsv2rgb } from "react-native-redash";

import Slider from "./Slider";

const BUTTON_SIZE = 35;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "500",
    marginLeft: 8,
  },
  side: {
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
});

interface ButtonProps {
  name: string;
}

const Button = ({ name }: ButtonProps) => (
  <View style={styles.button}>
    <Icon size={18} color="white" {...{ name }} />
  </View>
);

interface HeaderProps {
  h: Animated.Node<number>;
  s: Animated.Node<number>;
  v: Animated.Value<number>;
  backgroundColor: Animated.Node<number>;
}

export default ({ h, s, v, backgroundColor }: HeaderProps) => {
  const { r, g, b } = hsv2rgb(h, s, 1);
  const bg2 = color(r, g, b);
  return (
    <View>
      <Animated.View style={{ backgroundColor: color(r, g, b) }}>
        <SafeAreaView>
          <View style={styles.container}>
            <View style={styles.side}>
              <Button name="arrow-left" />
              <Animated.Text
                style={[styles.name, { color: colorForBackground(r, g, b) }]}
              >
                Living Room
              </Animated.Text>
            </View>
            <View style={styles.side}>
              <Button name="more-horizontal" />
            </View>
          </View>
        </SafeAreaView>
      </Animated.View>
      <Slider {...{ v, bg1: backgroundColor, bg2 }} />
    </View>
  );
};
