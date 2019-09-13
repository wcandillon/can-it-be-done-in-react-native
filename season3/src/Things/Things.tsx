import React from "react";
import Animated from "react-native-reanimated";
import { View } from "react-native";

import Content from "./Content";
import ScrollView from "./ScrollView";
import Search from "./Search";

const { Value } = Animated;

export default () => {
  const y = new Value(0);
  return (
    <View style={{ flex: 1 }}>
      <Search {...{ y }} />
      <ScrollView {...{ y }}>
        <Content />
      </ScrollView>
    </View>
  );
};
