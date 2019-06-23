import React, { useState, useMemo, useRef } from "react";
import { StyleSheet, Dimensions } from "react-native";
import Animated, {
  Transitioning,
  Transition,
  TransitioningView,
  Easing
} from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { decay, clamp, bInterpolate } from "react-native-redash";

import { useTransition } from "./AnimationHelpers";
import Tab, { ITab, OVERVIEW } from "./Tab";

const { height } = Dimensions.get("window");
const { Value, event, eq, neq, cond } = Animated;
const transition = <Transition.Change interpolation="linear" />;
const durationMs = 400;

export type ITabs = ITab[];

interface TabsProps {
  tabs: ITabs;
}

export default ({ tabs: tabsProps }: TabsProps) => {
  const ref = useRef<TransitioningView>();
  const [tabs, setTabs] = useState([...tabsProps]);
  const [selectedTab, setSelectedTab] = useState(OVERVIEW);
  const transitionVal = useTransition(
    selectedTab,
    neq(selectedTab, OVERVIEW),
    eq(selectedTab, OVERVIEW),
    durationMs,
    Easing.linear
  );
  const { onGestureEvent, translateY } = useMemo(() => {
    const translationY = new Value(0);
    const velocityY = new Value(0);
    const state = new Value(State.UNDETERMINED);
    const translateY1 = clamp(
      decay(translationY, state, velocityY),
      -tabsProps.length * 100,
      0
    );
    return {
      translateY: bInterpolate(transitionVal, 0, translateY1),
      onGestureEvent: event([
        {
          nativeEvent: {
            translationY,
            velocityY,
            state
          }
        }
      ])
    };
  }, [tabsProps.length, transitionVal]);
  return (
    <Transitioning.View
      style={styles.container}
      {...{ transition, ref, durationMs }}
    >
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
