import * as React from "react";
import { StyleSheet, StatusBar, Dimensions, View } from "react-native";
import Animated from "react-native-reanimated";

import { PanGestureHandler, State } from "react-native-gesture-handler";
import { decay, clamp } from "react-native-redash";
import Tab, { ITab, OVERVIEW } from "./Tab";

const { height } = Dimensions.get("window");
const { Value, event, cond, eq, interpolate } = Animated;

export type ITabs = ITab[];

interface TabsProps {
  tabs: ITabs;
}

export default ({ tabs }: TabsProps) => {
  const transition = new Value(0);
  const selectedTab = new Value(OVERVIEW);
  const translationY = new Value(0);
  const velocityY = new Value(0);
  const state = new Value(State.UNDETERMINED);
  const onGestureEvent = event([
    {
      nativeEvent: {
        translationY,
        velocityY,
        state
      }
    }
  ]);
  const y = clamp(decay(translationY, state, velocityY), -150 * tabs.length, 0);
  const translateY = interpolate(transition, {
    inputRange: [0, 1],
    outputRange: [0, y]
  });
  return (
    <>
      <StatusBar hidden />
      <View style={styles.background} />
      <PanGestureHandler
        onHandlerStateChange={onGestureEvent}
        {...{ onGestureEvent }}
      >
        <Animated.View style={{ flex: 1, transform: [{ translateY }] }}>
          {tabs.map((tab, index) => (
            <Tab key={tab.id} {...{ tab, transition, selectedTab, index }} />
          ))}
        </Animated.View>
      </PanGestureHandler>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black"
  }
});
