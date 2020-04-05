import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import Animated, {
  add,
  color,
  cond,
  divide,
  greaterThan,
  lessOrEq,
  multiply,
  pow
} from "react-native-reanimated";
import { Feather as Icon } from "@expo/vector-icons";
import { hsv2color, hsv2rgb } from "react-native-redash";

import Slider from "./Slider";

const l = (c1: Animated.Node<number>) => {
  const c = divide(c1, 255);
  return cond(
    lessOrEq(c, 0.03928),
    divide(c, 12.92),
    pow(divide(add(c, 0.055), 1.055), 2.4)
  );
};

const black = color(0, 0, 0);
const white = color(255, 255, 255);
const BUTTON_SIZE = 35;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16
  },
  name: {
    fontSize: 18,
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
  v: Animated.Value<number>;
  backgroundColor: Animated.Node<number>;
}

export default ({ h, s, v, backgroundColor }: HeaderProps) => {
  const { r, g, b } = hsv2rgb(h, s, 1);
  const bg2 = color(r, g, b);
  const L = add(multiply(0.299, r), multiply(0.587, g), multiply(0.114, b));
  // https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
  const textColor = cond(greaterThan(L, 186), black, white);
  return (
    <View>
      <Animated.View style={{ backgroundColor: bg2 }}>
        <SafeAreaView>
          <View style={styles.container}>
            <View style={styles.side}>
              <Button name="arrow-left" />
              <Animated.Text style={[styles.name, { color: textColor }]}>
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
