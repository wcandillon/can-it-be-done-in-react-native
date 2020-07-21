import React from "react";
import { View, StyleSheet } from "react-native";
import Animated, {
  useCode,
  set,
  divide,
  debug,
  multiply,
  defined,
  not,
  cond,
  Value,
  sub,
} from "react-native-reanimated";
import { PanGestureHandler } from "react-native-gesture-handler";
import {
  usePanGestureHandler,
  withDecay,
  diffClamp,
  useValue,
  useScrollHandler,
} from "react-native-redash";

import { ITEM_HEIGHT } from "./Constants";

interface GestureHandlerProps {
  value: Animated.Value<number>;
  max: number;
  defaultValue: number;
}

const GestureHandler = ({ value, max, defaultValue }: GestureHandlerProps) => {
  const { scrollHandler, y } = useScrollHandler();
  useCode(() => [set(value, divide(y, ITEM_HEIGHT))], []);
  return (
    <Animated.ScrollView
      style={StyleSheet.absoluteFillObject}
      snapToInterval={ITEM_HEIGHT}
      showsVerticalScrollIndicator={false}
      {...scrollHandler}
    >
      <View style={{ height: ITEM_HEIGHT * (max + 4) }} />
    </Animated.ScrollView>
  );
};

export default GestureHandler;
