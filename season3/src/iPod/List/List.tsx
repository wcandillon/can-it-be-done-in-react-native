import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Value,
  add,
  block,
  cond,
  diff,
  diffClamp,
  lessThan,
  multiply,
  not,
  set,
  sub,
  useCode,
} from "react-native-reanimated";
import { between } from "react-native-redash";

import { Command, useOnPress } from "../ClickWheel";
import { CONTENT_HEIGHT } from "../IPodNavigator";

import Item, { Item as ItemModel } from "./Item";

const ITEM_HEIGHT = 45;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

interface ListProps {
  items: ItemModel[];
  y: Animated.Node<number>;
  command: Animated.Value<Command>;
}

const inViewport = (
  y: Animated.Node<number>,
  translateY: Animated.Node<number>
) => between(y, translateY, add(translateY, CONTENT_HEIGHT));

export default ({ items, y: y1, command }: ListProps) => {
  const y = diffClamp(y1, 0, items.length * ITEM_HEIGHT - 1);
  const translateY = new Value(0);
  const goingUp = lessThan(diff(y), 0);
  useOnPress(command, Command.TOP, (navigation) => navigation.navigate("Menu"));
  useCode(
    () =>
      block([
        cond(
          not(inViewport(y, multiply(-1, translateY))),
          set(
            translateY,
            cond(
              goingUp,
              [add(translateY, ITEM_HEIGHT)],
              [sub(translateY, ITEM_HEIGHT)]
            )
          )
        ),
      ]),
    [goingUp, translateY, y]
  );
  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ translateY }] }}>
        {items.map((item, key) => (
          <Item
            key={key}
            onPress={(n) => n.navigate(item.screen, item.params)}
            active={between(y, key * ITEM_HEIGHT, (key + 1) * ITEM_HEIGHT)}
            {...{ command }}
            {...item}
          />
        ))}
      </Animated.View>
    </View>
  );
};
