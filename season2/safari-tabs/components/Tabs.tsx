import React, { useState, useMemo, useRef } from "react";
import { StyleSheet, StatusBar } from "react-native";
import Animated, {
  Transitioning,
  Transition,
  TransitioningView
} from "react-native-reanimated";

import { PanGestureHandler, State } from "react-native-gesture-handler";
import { decay, clamp } from "react-native-redash";
import Tab, { ITab, OVERVIEW } from "./Tab";

const { Value, event, interpolate } = Animated;
const OFFSET_Y = -150;
const transition = <Transition.Change interpolation="linear" />;

export type ITabs = ITab[];

interface TabsProps {
  tabs: ITabs;
}

export default ({ tabs: tabsProps }: TabsProps) => {
  const ref = useRef<TransitioningView>();
  const [tabs, setTabs] = useState(tabsProps);
  const [selectedTab, selectTab] = useState(OVERVIEW);
  const { transition, translationY, velocityY, state, offset } = useMemo(
    () => ({
      transition: new Value(0),
      translationY: new Value(0),
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
    <Transitioning.View style={styles.container} {...{ ref, transition }}>
      <StatusBar hidden />
      <PanGestureHandler
        onHandlerStateChange={onGestureEvent}
        {...{ onGestureEvent }}
      >
        <Animated.View style={{ flex: 1, transform: [{ translateY }] }}>
          {tabs.map((tab, index) => (
            <Tab
              key={tab.id}
              selectTab={() => {
                ref.current!.animateNextTransition();
                selectTab(index);
              }}
              closeTab={() => {
                ref.current!.animateNextTransition();
                tabs.splice(index, 1);
                // offset.setValue(OFFSET_Y * tabs.length);
                setTabs([...tabs]);
              }}
              {...{ tab, transition, selectedTab, index }}
            />
          ))}
        </Animated.View>
      </PanGestureHandler>
    </Transitioning.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  }
});
