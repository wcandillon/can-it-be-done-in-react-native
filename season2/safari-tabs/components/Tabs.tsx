import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, StatusBar, View } from "react-native";
import Animated from "react-native-reanimated";

import { PanGestureHandler, State } from "react-native-gesture-handler";
import { decay, clamp } from "react-native-redash";
import Tab, { ITab, OVERVIEW } from "./Tab";

const { Value, event, interpolate } = Animated;
const OFFSET_Y = -150;

export type ITabs = ITab[];

interface TabsProps {
  tabs: ITabs;
}

export default ({ tabs: tabsProps }: TabsProps) => {
  const [tabs, setTabs] = useState(tabsProps);
  const {
    transition,
    translationY,
    selectedTab,
    velocityY,
    state,
    offset
  } = useMemo(
    () => ({
      transition: new Value(0),
      translationY: new Value(0),
      selectedTab: new Value(OVERVIEW),
      velocityY: new Value(0),
      state: new Value(State.UNDETERMINED),
      offset: new Value(OFFSET_Y * tabs.length)
    }),
    // Here we don't want tabs as a dependency of this memo
    // because we want to update the offset animated value without triggering a re-render
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  const { onGestureEvent, translateY } = useMemo(
    () => ({
      onGestureEvent: event([
        {
          nativeEvent: {
            translationY,
            velocityY,
            state
          }
        }
      ]),
      translateY: interpolate(transition, {
        inputRange: [0, 1],
        outputRange: [
          0,
          clamp(decay(translationY, state, velocityY), offset, 0)
        ]
      })
    }),
    [offset, state, transition, translationY, velocityY]
  );
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
            <Tab
              key={tab.id}
              closeTab={() => {
                tabs.splice(index, 1);
                offset.setValue(OFFSET_Y * tabs.length);
                setTabs([...tabs]);
              }}
              {...{ tab, transition, selectedTab, index }}
            />
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
