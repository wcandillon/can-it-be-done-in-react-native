import React from "react";
import { StyleSheet, View, processColor } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Animated, { cond } from "react-native-reanimated";

import { Command, useOnPress } from "../ClickWheel";

const blue = processColor("#2980b9");
const white = processColor("white");
const black = processColor("black");
const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    height: 45
  },
  icon: {
    paddingHorizontal: 16
  },
  label: {
    fontSize: 16,
    fontFamily: "Chicago"
  }
});

export interface Item {
  screen: string;
  label: string;
  icon: string;
}

interface ItemProps extends Item {
  active: Animated.Node<0 | 1>;
  command: Animated.Node<Command>;
  onPress: () => void;
}

export default ({ icon, label, command, active, onPress }: ItemProps) => {
  const backgroundColor = cond(active, blue, white);
  const color = cond(active, white, black);
  useOnPress(command, Command.CENTER, onPress, active);
  return (
    <Animated.View style={[styles.item, { backgroundColor }]}>
      <View>
        <Icon name={icon} color="black" style={styles.icon} size={24} />
        <Animated.View
          style={{ ...StyleSheet.absoluteFillObject, opacity: active }}
        >
          <Icon name={icon} color="white" style={styles.icon} size={24} />
        </Animated.View>
      </View>
      <Animated.Text style={[styles.label, { color }]}>{label}</Animated.Text>
    </Animated.View>
  );
};
