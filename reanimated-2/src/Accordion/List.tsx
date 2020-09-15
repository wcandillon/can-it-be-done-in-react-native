import React from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import Animated, {
  useAnimatedRef,
  measure,
  useSharedValue,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
  runOnUI,
} from "react-native-reanimated";

import Chevron from "./Chevron";
import Item, { ListItem } from "./ListItem";

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  items: {
    overflow: "hidden",
  },
});

export interface List {
  name: string;
  items: ListItem[];
}

interface ListProps {
  list: List;
}

const List = ({ list }: ListProps) => {
  const aRef = useAnimatedRef<View>();
  const open = useSharedValue(false);
  const height = useSharedValue(0);
  const transition = useDerivedValue(() => {
    return open.value ? withSpring(1) : withTiming(0);
  });
  const headerStyle = useAnimatedStyle(() => ({
    borderBottomLeftRadius: transition.value === 0 ? 8 : 0,
    borderBottomRightRadius: transition.value === 0 ? 8 : 0,
  }));
  const style = useAnimatedStyle(() => ({
    height: 1 + transition.value * height.value,
    opacity: transition.value === 0 ? 0 : 1,
  }));
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          if (height.value === 0) {
            runOnUI(() => {
              "worklet";
              height.value = measure(aRef).height;
            })();
          }
          open.value = !open.value;
        }}
      >
        <Animated.View style={[styles.container, headerStyle]}>
          <Text style={styles.title}>Total Points</Text>
          <Chevron transition={transition} />
        </Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.items, style]}>
        <View ref={aRef}>
          {list.items.map((item, key) => (
            <Item
              key={key}
              isLast={key === list.items.length - 1}
              {...{ item }}
            />
          ))}
        </View>
      </Animated.View>
    </>
  );
};

export default List;
