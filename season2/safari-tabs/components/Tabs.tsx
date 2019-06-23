import React, { useState, useMemo, useRef } from "react";
import { StyleSheet, StatusBar } from "react-native";
import Animated, {
  Transitioning,
  Transition,
  TransitioningView,
  Easing
} from "react-native-reanimated";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import { decay, clamp, runTiming } from "react-native-redash";

import { useTransition } from "./AnimationHelpers";
import Tab, { ITab, OVERVIEW } from "./Tab";

const { Value, Clock, event, interpolate, useCode, set, eq, neq } = Animated;
const OFFSET_Y = -150;
const transition = <Transition.Change interpolation="linear" />;
const durationMs = 400;

export type ITabs = ITab[];

interface TabsProps {
  tabs: ITabs;
}

export default ({ tabs: tabsProps }: TabsProps) => {
  const ref = useRef<TransitioningView>();
  const [tabs, setTabs] = useState(tabsProps);
  const [selectedTab, setSelectedTab] = useState(OVERVIEW);
  const transitionVal = useTransition(
    selectedTab,
    neq(selectedTab, OVERVIEW),
    eq(selectedTab, OVERVIEW),
    durationMs
  );
  return (
    <Transitioning.View
      style={styles.container}
      {...{ transition, ref, durationMs }}
    >
      <Animated.View style={styles.content}>
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
            transition={transitionVal}
            closeTab={() => {
              ref.current!.animateNextTransition();
              tabs.splice(index, 1);
              setTabs([...tabs]);
            }}
            selectTab={() => {
              ref.current!.animateNextTransition();
              setSelectedTab(selectedTab === index ? OVERVIEW : index);
            }}
            {...{ tab, selectedTab, index }}
          />
        ))}
      </Animated.View>
    </Transitioning.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  },
  content: { flex: 1 }
});
