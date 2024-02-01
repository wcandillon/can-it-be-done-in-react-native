import type { SharedValue } from "react-native-reanimated";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { mix } from "@shopify/react-native-skia";

import {
  makeAnimation,
  stagger,
  timing,
  useAnimation,
  waitUntil,
} from "./Animations";

const Item = ({
  label,
  transition,
}: {
  label: string;
  transition?: SharedValue<number>;
}) => {
  const style = useAnimatedStyle(() => ({
    paddingVertical: 16,
    opacity: transition?.value ?? 1,
    left: mix(transition?.value ?? 1, -50, 0),
  }));
  return (
    <Animated.View style={style}>
      <Text style={styles.label}>{label}</Text>
    </Animated.View>
  );
};

const duration = 250;

const animation = makeAnimation(
  function* ({ transition, open, item1, item2, item3, item4, item5 }) {
    "worklet";
    let to = 1;
    while (true) {
      yield* waitUntil(open, to ? false : true);
      yield* stagger(
        duration / 2,
        timing(transition, { to, duration }),
        timing(item1, { to, duration }),
        timing(item2, { to, duration }),
        timing(item3, { to, duration }),
        timing(item4, { to, duration }),
        timing(item5, { to, duration })
      );

      to = to === 1 ? 0 : 1;
    }
  },
  {
    open: false,
    transition: 0,
    item1: 0,
    item2: 0,
    item3: 0,
    item4: 0,
    item5: 0,
  }
);

export const Generators = () => {
  const { open, transition, item1, item2, item3, item4, item5 } =
    useAnimation(animation);
  const content = useAnimatedStyle(() => ({
    transform: [
      { translateY: -100 },
      { scale: transition.value },
      { translateY: 100 },
    ],
    margin: 16,
    marginTop: 0,
    borderRadius: 16,
    padding: 16,
    backgroundColor: "white",
  }));
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          open.value = !open.value;
        }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Menu</Text>
        </View>
      </Pressable>
      <Animated.View style={content}>
        <Item label="Item 1" transition={item1} />
        <Item label="Item 2" transition={item2} />
        <Item label="Item 3" transition={item3} />
        <Item label="Item 4" transition={item4} />
        <Item label="Item 5" transition={item5} />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#9900FF",
    paddingTop: 64,
  },
  header: {
    margin: 16,
    borderRadius: 16,
    padding: 16,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: "#9900FF",
    fontSize: 20,
    fontWeight: "bold",
  },
  label: {
    color: "#9900FF",
    fontSize: 16,
  },
});
