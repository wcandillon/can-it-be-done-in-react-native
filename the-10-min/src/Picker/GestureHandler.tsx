import React, { useRef, useEffect } from "react";
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
  useScrollHandler,
} from "react-native-redash";

import { ITEM_HEIGHT } from "./Constants";

interface GestureHandlerProps {
  value: Animated.Value<number>;
  max: number;
  defaultValue: number;
}

const GestureHandler = ({ value, max, defaultValue }: GestureHandlerProps) => {
  const scrollView = useRef<Animated.ScrollView>(null);
  const { scrollHandler, y } = useScrollHandler();
  useCode(() => [set(value, divide(y, ITEM_HEIGHT))], []);
  useEffect(() => {
    scrollView.current
      ?.getNode()
      .scrollTo({ y: defaultValue * ITEM_HEIGHT, animated: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollView.current]);
  return (
    <Animated.ScrollView
      ref={scrollView}
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
