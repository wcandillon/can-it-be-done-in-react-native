import React from "react";
import { StyleSheet, Text, processColor } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Animated, { cond } from "react-native-reanimated";

import { Command, useOnPress } from "../ClickWheel";
import Image from "../Image";
import { PlayerParams } from "../data";
import { Navigation } from "../IPodNavigator";

import Active from "./Active";

const blue = processColor("#2980b9");
const white = processColor("white");
const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    height: 45,
  },
  icon: {
    paddingHorizontal: 16,
  },
  labelContainer: {
    flex: 1,
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    fontFamily: "Chicago",
    flexWrap: "wrap",
  },
  thumbnail: {
    width: 45,
    height: 45,
    marginHorizontal: 16,
  },
});

export interface Item {
  screen: string;
  label: string;
  icon?: string;
  thumbnail?: string;
  params?: PlayerParams;
}

interface ItemProps extends Item {
  active: Animated.Node<0 | 1>;
  command: Animated.Value<Command>;
  onPress: (navigation: Navigation) => void;
}

export default ({
  icon,
  thumbnail,
  label,
  command,
  active,
  onPress,
}: ItemProps) => {
  const backgroundColor = cond(active, blue, white);
  useOnPress(command, Command.CENTER, onPress, active);
  return (
    <Animated.View style={[styles.item, { backgroundColor }]}>
      {icon && (
        <Active {...{ active }}>
          <Icon name={icon} color="black" style={styles.icon} size={24} />
        </Active>
      )}
      {thumbnail && <Image source={thumbnail} style={styles.thumbnail} />}
      <Active style={styles.labelContainer} {...{ active }}>
        <Text numberOfLines={1} style={styles.label}>
          {label}
        </Text>
      </Active>
    </Animated.View>
  );
};
