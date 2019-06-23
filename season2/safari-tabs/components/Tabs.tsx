import React, { useState, useMemo, useRef, useCallback } from "react";
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
  const [selectedTab, setSelectedTab] = useState(OVERVIEW);
  return (
    <Transitioning.View style={styles.container} ref={ref} {...{ transition }}>
      <StatusBar hidden />
      <Animated.View style={{ flex: 1 }}>
        {tabs.map((tab, index) => (
          <Tab
            key={tab.id}
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
  }
});
