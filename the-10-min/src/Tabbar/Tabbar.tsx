import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { timing, withTransition } from "react-native-redash";
import { Value, block, onChange, set, useCode } from "react-native-reanimated";
import Tab from "./Tab";
import Particules from "./Particules";
import Weave from "./Weave";
import Compass from "./icons/Compass";
import Chat from "./icons/Chat";
import Camera from "./icons/Camera";
import Bell from "./icons/Bell";
import User from "./icons/User";
import { DURATION, ICON_SIZE, PADDING, SEGMENT } from "./icons/Constants";

const tabs = [
  { icon: <Compass /> },
  { icon: <Chat /> },
  { icon: <Camera /> },
  { icon: <Bell /> },
  { icon: <User /> },
];
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  tabs: {
    flexDirection: "row",
    alignItems: "center",
  },
  tab: {
    width: SEGMENT,
    height: ICON_SIZE + PADDING * 2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default () => {
  const active = new Value<number>(0);
  const transition = withTransition(active, { duration: DURATION });
  const activeTransition = new Value(0);
  useCode(
    () =>
      block([
        onChange(active, set(activeTransition, 0)),
        set(activeTransition, timing({ duration: DURATION })),
      ]),
    [active, activeTransition]
  );
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.tabs}>
        {tabs.map(({ icon }, index) => (
          <View key={index} style={styles.tab}>
            <Weave {...{ active, transition, index }} />
            <Tab
              onPress={() => active.setValue(index)}
              {...{ active, transition, index }}
            >
              {icon}
            </Tab>
          </View>
        ))}
        <Particules {...{ transition, activeTransition }} />
      </View>
    </SafeAreaView>
  );
};
