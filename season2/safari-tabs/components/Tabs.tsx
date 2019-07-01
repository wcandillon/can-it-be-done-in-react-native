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
  bInterpolate,
  useTransition,
  onGestureEvent
} from "react-native-redash";

import Tab from "./Tab";
import { TabsModel, OVERVIEW } from "./Model";

const { height } = Dimensions.get("window");
const { Value, eq, neq, diffClamp } = Animated;
const durationMs = 400;
const easing = Easing.inOut(Easing.ease);
const transition = (
  <Transition.Change interpolation="easeInOut" {...{ durationMs }} />
);

interface TabsProps {
  tabs: TabsModel;
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
  const { gestureEvent, translateY } = useMemo(() => {
    const translationY = new Value(0);
    const velocityY = new Value(0);
    const state = new Value(State.UNDETERMINED);
    const translateY1 = diffClamp(
      decay(translationY, state, velocityY),
      -tabsProps.length * 100,
      0
    );
    return {
      translateY: bInterpolate(transitionVal, 0, translateY1),
      gestureEvent: onGestureEvent({
        translationY,
        velocityY,
        state
      })
    };
  }, [tabsProps.length, transitionVal]);
  return (
    <PanGestureHandler {...gestureEvent}>
      <Animated.View
        style={{
          backgroundColor: "black",
          height: tabsProps.length * height,
          transform: [{ translateY }]
        }}
      >
        <Transitioning.View
          style={StyleSheet.absoluteFill}
          {...{ transition, ref }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={tab.id}
              transition={transitionVal}
              closeTab={() => {
                if (ref.current) {
                  ref.current.animateNextTransition();
                }
                setTabs([...tabs.slice(0, index), ...tabs.slice(index + 1)]);
              }}
              selectTab={() => {
                if (ref.current) {
                  ref.current.animateNextTransition();
                }
                setSelectedTab(selectedTab === index ? OVERVIEW : index);
              }}
              {...{ tab, selectedTab, index }}
            />
          ))}
        </Transitioning.View>
      </Animated.View>
    </PanGestureHandler>
  );
};
