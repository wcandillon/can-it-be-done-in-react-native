import React, { useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Transition,
  Transitioning,
  TransitioningView
} from "react-native-reanimated";
import { useMemoOne } from "use-memo-one";
import Tab, { tabs as defaultTards } from "./Tab";
import SortableTab from "./SortableTab";

const height = 100;
const { Value, cond, eq } = Animated;
const transition = <Transition.Change durationMs={200} />;
export default () => {
  const ref = useRef<TransitioningView>(null);
  const { activeTab } = useMemoOne(() => ({ activeTab: new Value(-1) }), []);
  const [tabs, setTabs] = useState(defaultTards);
  const [dynamicTabs, setDynamicTabs] = useState(defaultTards);
  const onRelease = () => {
    setTabs(dynamicTabs);
    activeTab.setValue(-1);
  };
  return (
    <View style={{ flex: 1 }}>
      <Transitioning.View style={{ flex: 1 }} {...{ ref, transition }}>
        {dynamicTabs.map(tab => (
          <Animated.View
            key={tab.id}
            style={{
              opacity: cond(eq(activeTab, tab.id), 0, 1)
            }}
          >
            <Tab {...{ tab }} />
          </Animated.View>
        ))}
      </Transitioning.View>
      <View style={StyleSheet.absoluteFill}>
        {tabs.map((tab, i) => (
          <SortableTab
            // eslint-disable-next-line react/no-array-index-key
            key={`${tab.id}-${i}`}
            onChange={(oldIndex, newIndex) => {
              const newTabs = [...dynamicTabs];
              newTabs.splice(oldIndex, 1);
              newTabs.splice(newIndex, 0, tab);
              if (ref.current) {
                ref.current.animateNextTransition();
              }
              setDynamicTabs(newTabs);
            }}
            offset={i * height}
            index={dynamicTabs.indexOf(tab)}
            {...{ tab, height, activeTab, onRelease }}
          />
        ))}
      </View>
    </View>
  );
};
