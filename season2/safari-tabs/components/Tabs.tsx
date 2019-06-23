import React, { useState, useMemo, useRef } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, {
  Transitioning,
  Transition,
  TransitioningView,
  Easing
} from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import {
  decay,
  limit,
  bInterpolate,
  useTransition,
  gestureEvent
} from "react-native-redash";

import Tab, { ITab, OVERVIEW } from "./Tab";

const { height } = Dimensions.get("window");
const { Value, eq, neq } = Animated;
const durationMs = 400;
const easing = Easing.inOut(Easing.ease);
const transition = (
  <Transition.Change interpolation="easeInOut" {...{ durationMs }} />
);

export type ITabs = ITab[];

interface TabsProps {
  tabs: ITabs;
}

export default ({ tabs: tabsProps }: TabsProps) => {
  const ref = useRef<TransitioningView>(null);
  const [tabs, setTabs] = useState([...tabsProps]);
  const [selectedTab, setSelectedTab] = useState(OVERVIEW);
  const transitionVal = useTransition(
    selectedTab,
    neq(selectedTab, OVERVIEW),
    eq(selectedTab, OVERVIEW),
    durationMs,
    easing
  );
  const { onGestureEvent, translateY } = useMemo(() => {
    const translationY = new Value(0);
    const velocityY = new Value(0);
    const state = new Value(State.UNDETERMINED);
    const translateY1 = limit(
      decay(translationY, state, velocityY),
      state,
      -tabsProps.length * 100,
      0
    );
    return {
      translateY: bInterpolate(transitionVal, 0, translateY1),
      onGestureEvent: gestureEvent({
        translationY,
        velocityY,
        state
      })
    };
  }, [tabsProps.length, transitionVal]);
  return (
    <Transitioning.View style={styles.container} {...{ transition, ref }}>
      <PanGestureHandler
        onHandlerStateChange={onGestureEvent}
        {...{ onGestureEvent }}
      >
        <Animated.View
          style={{
            height: tabsProps.length * height,
            transform: [{ translateY }]
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={tab.id}
              transition={transitionVal}
              closeTab={() => {
                ref.current!.animateNextTransition();
                setTabs([...tabs.slice(0, index), ...tabs.slice(index + 1)]);
              }}
              selectTab={() => {
                ref.current!.animateNextTransition();
                setSelectedTab(selectedTab === index ? OVERVIEW : index);
              }}
              {...{ tab, selectedTab, index }}
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
