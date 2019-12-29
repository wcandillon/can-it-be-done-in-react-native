import React from "react";
import { StyleSheet, View, processColor } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Animated, {
  and,
  block,
  call,
  cond,
  debug,
  diffClamp,
  eq,
  useCode
} from "react-native-reanimated";
import { between } from "react-native-redash";
import { useNavigation } from "react-navigation-hooks";
import { NavigationStackProp } from "react-navigation-stack";
import { Command, useOnPress } from "./Buttons";

const ITEM_HEIGHT = 45;
const blue = processColor("#2980b9");
const white = processColor("white");
const black = processColor("black");
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
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

interface Item {
  screen: string;
  icon: string;
  label: string;
}

interface ItemProps extends Item {
  active: Animated.Node<0 | 1>;
  command: Animated.Node<Command>;
  onPress: () => void;
}

const Item = ({ icon, label, command, active, onPress }: ItemProps) => {
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

interface ListProps {
  items: Item[];
  y: Animated.Node<number>;
  command: Animated.Node<Command>;
}

export default ({ items, y, command }: ListProps) => {
  const navigation = useNavigation<NavigationStackProp>();
  const y1 = diffClamp(y, 0, items.length * ITEM_HEIGHT);
  useOnPress(command, Command.TOP, () => navigation.navigate("Menu"));
  return (
    <View style={styles.container}>
      {items.map((item, key) => (
        <Item
          onPress={() => navigation.navigate(item.screen)}
          active={between(y1, key * ITEM_HEIGHT, (key + 1) * ITEM_HEIGHT)}
          {...{ command, key }}
          {...item}
        />
      ))}
    </View>
  );
};
