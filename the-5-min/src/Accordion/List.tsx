import React, { RefObject, useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

import Animated, { Easing, TransitioningView } from "react-native-reanimated";
import { useTransition } from "react-native-redash";
import Chevron from "./Chevron";
import Item, { ListItem } from "./ListItem";

const { not, interpolate } = Animated;
const bit = (b: boolean) => (b ? 1 : 0);
const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  items: {
    overflow: "hidden"
  }
});

export interface List {
  name: string;
  items: ListItem[];
}

interface ListProps {
  list: List;
  transition: RefObject<TransitioningView>;
}

export default ({ list, transition }: ListProps) => {
  const [open, setOpen] = useState(false);
  const trn = useTransition(
    open,
    not(bit(open)),
    bit(open),
    400,
    Easing.inOut(Easing.ease)
  );
  const height = open ? "auto" : 0;
  const bottomRadius = interpolate(trn, {
    inputRange: [0, 16 / 400],
    outputRange: [8, 0]
  });
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          if (transition.current) {
            transition.current.animateNextTransition();
          }
          setOpen(prev => !prev);
        }}
      >
        <Animated.View
          style={[
            styles.container,
            {
              borderBottomLeftRadius: bottomRadius,
              borderBottomRightRadius: bottomRadius
            }
          ]}
        >
          <Text style={styles.title}>Total Points</Text>
          <Chevron transition={trn} {...{ open }} />
        </Animated.View>
      </TouchableWithoutFeedback>
      <View style={[styles.items, { height }]}>
        {list.items.map((item, key) => (
          <Item {...{ item, key }} isLast={key === list.items.length - 1} />
        ))}
      </View>
    </>
  );
};
