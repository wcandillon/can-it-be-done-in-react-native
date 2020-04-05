import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { Feather as Icon } from "@expo/vector-icons";
import { hsv2rgb } from "react-native-redash";

import Slider from "./Slider";

const BUTTON_SIZE = 35;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16
  },
  name: {
    fontSize: 18,
    color: "white",
    fontWeight: "500",
    marginLeft: 8
  },
  side: {
    flexDirection: "row",
    alignItems: "center"
  },
  button: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    justifyContent: "center",
    alignItems: "center"
  }
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
  v: Animated.Node<number>;
}

export default ({ h, s, v }: HeaderProps) => {
  const bg1 = hsv2rgb(h, s, v);
  const bg2 = hsv2rgb(h, s, 1);
  return (
    <View>
      <Animated.View style={{ backgroundColor: bg2 }}>
        <SafeAreaView>
          <View style={styles.container}>
            <View style={styles.side}>
              <Button name="arrow-left" />
              <Text style={styles.name}>Living Room</Text>
            </View>
            <View style={styles.side}>
              <Button name="more-horizontal" />
            </View>
          </View>
        </SafeAreaView>
      </Animated.View>
      <Slider {...{ v, bg1, bg2 }} />
    </View>
  );
};
