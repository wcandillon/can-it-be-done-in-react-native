import React from "react";
import { StyleSheet, View, processColor } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Animated, {
  Value,
  add,
  and,
  block,
  ceil,
  cond,
  debug,
  diff,
  diffClamp,
  divide,
  floor,
  greaterOrEq,
  greaterThan,
  lessOrEq,
  lessThan,
  multiply,
  not,
  set,
  sub,
  useCode
} from "react-native-reanimated";
import { between } from "react-native-redash";
import { useNavigation } from "react-navigation-hooks";
import { NavigationStackProp } from "react-navigation-stack";

import { Command, useOnPress } from "./ClickWheel";
import { SCREEN_SIZE } from "./IPodNavigator";
import { STATUS_BAR_HEIGHT } from "./StatusBar";

const CONTAINER_HEIGHT = SCREEN_SIZE - STATUS_BAR_HEIGHT;
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

const inViewport = (
  index: Animated.Node<number>,
  translateY: Animated.Node<number>
) => {
  const y = multiply(add(index, 1), ITEM_HEIGHT);
  return and(
    greaterOrEq(y, translateY),
    lessOrEq(y, add(translateY, CONTAINER_HEIGHT))
  );
};

export default ({ items, y, command }: ListProps) => {
  const navigation = useNavigation<NavigationStackProp>();
  const y1 = diffClamp(y, 0, items.length * ITEM_HEIGHT - 1);
  const translateY = new Value(0);
  const goingUp = lessThan(diff(y1), 0);
  const index = floor(divide(y1, ITEM_HEIGHT));
  useOnPress(command, Command.TOP, () => navigation.navigate("Menu"));
  useCode(
    () =>
      block([
        debug("index", index),
        cond(
          not(inViewport(index, translateY)),
          set(
            translateY,
            cond(
              goingUp,
              [multiply(sub(index, 1), ITEM_HEIGHT)],
              [add(multiply(index, -ITEM_HEIGHT), CONTAINER_HEIGHT)]
            )
          )
        )
      ]),
    [goingUp, index, translateY]
  );
  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {items.map((item, key) => (
          <Item
            onPress={() => navigation.navigate(item.screen)}
            active={between(y1, key * ITEM_HEIGHT, (key + 1) * ITEM_HEIGHT)}
            {...{ command, key }}
            {...item}
          />
        ))}
      </Animated.View>
    </View>
  );
};
