import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Value,
  and,
  block,
  cond,
  greaterOrEq,
  interpolate,
  lessOrEq,
  set,
  useCode
} from "react-native-reanimated";
import MaskedView from "@react-native-community/masked-view";

import { withTransition } from "react-native-redash";
import Tabs, { tabs } from "./Tabs";

const styles = StyleSheet.create({
  container: {
    marginLeft: 8,
    height: 45,
    marginBottom: 8,
    flexDirection: "row"
  }
});

interface TabHeaderProps {
  transition: Animated.Node<number>;
  y: Animated.Node<number>;
}

export default ({ transition, y }: TabHeaderProps) => {
  const index = new Value<number>(0);
  const [measurements, setMeasurements] = useState<number[]>(
    new Array(tabs.length).fill(0)
  );
  const opacity = transition;
  const indexTransition = withTransition(index);
  const width = interpolate(indexTransition, {
    inputRange: tabs.map((_, i) => i),
    outputRange: measurements
  });
  const translateX = interpolate(indexTransition, {
    inputRange: tabs.map((_tab, i) => i),
    outputRange: measurements.map((_, i) => {
      return (
        measurements
          .filter((_measurement, j) => j < i)
          .reduce((acc, m) => acc + m, 0) +
        8 * i
      );
    })
  });
  const style = {
    borderRadius: 24,
    backgroundColor: "black",
    width,
    flex: 1,
    transform: [{ translateX }]
  };
  const maskElement = <Animated.View {...{ style }} />;
  useCode(
    () =>
      block(
        tabs.map((tab, i) =>
          cond(
            i === tabs.length - 1
              ? greaterOrEq(y, tab.anchor)
              : and(
                  greaterOrEq(y, tab.anchor),
                  lessOrEq(y, tabs[i + 1].anchor)
                ),
            set(index, i)
          )
        )
      ),
    [index, y]
  );
  return (
    <Animated.View style={[styles.container, { opacity }]}>
      <Tabs
        onMeasurement={(i, m) => {
          measurements[i] = m;
          setMeasurements([...measurements]);
        }}
      />
      <View>
        <Animated.View {...{ style }} />
      </View>
      <MaskedView style={StyleSheet.absoluteFill} maskElement={maskElement}>
        <Tabs active onPress={i => index.setValue(i)} />
      </MaskedView>
    </Animated.View>
  );
};
