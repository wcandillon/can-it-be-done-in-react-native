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
  greaterOrEq,
  greaterThan,
  lessOrEq,
  multiply,
  not,
  set,
  useCode
} from "react-native-reanimated";
import { between } from "react-native-redash";
import { useNavigation } from "react-navigation-hooks";
import { NavigationStackProp } from "react-navigation-stack";

import { Command, useOnPress } from "./ClickWheel";
import { SCREEN_SIZE } from "./IPodNavigator";

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
  y: Animated.Node<number>,
  translateY: Animated.Node<number>
) => {
  const y1 = multiply(ceil(divide(y, ITEM_HEIGHT)), ITEM_HEIGHT);
  return and(
    greaterOrEq(y1, translateY),
    lessOrEq(y1, add(translateY, SCREEN_SIZE))
  );
};

export default ({ items, y, command }: ListProps) => {
  const navigation = useNavigation<NavigationStackProp>();
  const y1 = diffClamp(y, 0, items.length * ITEM_HEIGHT);
  const translateY = new Value(0);
  const goingUp = greaterThan(diff(y1), 0);
  useOnPress(command, Command.TOP, () => navigation.navigate("Menu"));
  useCode(
    () =>
      block([
        cond(
          not(inViewport(y1, translateY)),
          set(
            translateY,
            add(translateY, cond(goingUp, -ITEM_HEIGHT, ITEM_HEIGHT))
          )
        )
      ]),
    [goingUp, translateY, y1]
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
