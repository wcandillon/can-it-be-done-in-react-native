import * as React from "react";
import Animated from "react-native-reanimated";
import { onScroll } from "react-native-redash";

import Tab from "./Tab";

const { Value } = Animated;

export default () => {
  const y = new Value(0);
  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={onScroll({ y })}
      scrollEventThrottle={1}
      vertical
    >
      <Tab color="cyan" />
      <Tab color="green" />
      <Tab color="red" />
      <Tab color="blue" />
    </Animated.ScrollView>
  );
};
