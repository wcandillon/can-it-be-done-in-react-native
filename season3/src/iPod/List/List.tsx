import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Value,
  add,
  and,
  block,
  cond,
  diff,
  diffClamp,
  divide,
  floor,
  greaterOrEq,
  lessOrEq,
  lessThan,
  multiply,
  not,
  set,
  sub,
  useCode
} from "react-native-reanimated";
import { between } from "react-native-redash";

import { Command, useOnPress } from "../ClickWheel";
import { CONTENT_HEIGHT } from "../IPodNavigator";
import Item, { Item as ItemModel } from "./Item";

const ITEM_HEIGHT = 45;
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

interface ListProps {
  items: ItemModel[];
  y: Animated.Node<number>;
  command: Animated.Value<Command>;
}

const inViewport = (
  index: Animated.Node<number>,
  translateY: Animated.Node<number>,
  goingUp: Animated.Node<0 | 1>
) => {
  const y = multiply(add(index, not(goingUp)), ITEM_HEIGHT);
  const translate = multiply(translateY, -1);
  return and(
    greaterOrEq(y, translate),
    lessOrEq(y, add(translate, CONTENT_HEIGHT))
  );
};

export default ({ items, y, command }: ListProps) => {
  const y1 = diffClamp(y, 0, items.length * ITEM_HEIGHT - 1);
  const translateY = new Value(0);
  const goingUp = lessThan(diff(y1), 0);
  const index = floor(divide(y1, ITEM_HEIGHT));
  useOnPress(command, Command.TOP, navigation => navigation.navigate("Menu"));
  useCode(
    () =>
      block([
        cond(
          not(inViewport(index, translateY, goingUp)),
          set(
            translateY,
            cond(
              goingUp,
              [add(translateY, ITEM_HEIGHT)],
              [sub(translateY, ITEM_HEIGHT)]
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
            onPress={n => n.navigate(item.screen, item.params)}
            active={between(y1, key * ITEM_HEIGHT, (key + 1) * ITEM_HEIGHT)}
            {...{ command, key }}
            {...item}
          />
        ))}
      </Animated.View>
    </View>
  );
};
