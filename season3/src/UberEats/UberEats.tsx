import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, { debug, useCode } from "react-native-reanimated";
import { onScroll } from "react-native-redash";

import HeaderImage from "./HeaderImage";
import Content from "./Content";
import Header from "./Header";

const { Value } = Animated;
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default () => {
  const y = new Value(0);
  return (
    <View style={styles.container}>
      <HeaderImage {...{ y }} />
      <Animated.ScrollView
        style={StyleSheet.absoluteFill}
        onScroll={onScroll({ y })}
        scrollEventThrottle={1}
      >
        <Content {...{ y }} />
      </Animated.ScrollView>
      <Header {...{ y }} />
    </View>
  );
};
