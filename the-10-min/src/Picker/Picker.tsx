import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Animated, { interpolate, useCode, debug } from "react-native-reanimated";
import { useValue } from "react-native-redash";

import GestureHandler from "./GestureHandler";
import { ITEM_HEIGHT } from "./Constants";

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT * 5,
    overflow: "hidden",
  },
  item: {
    ...StyleSheet.absoluteFillObject,
    height: ITEM_HEIGHT,
  },
  label: {
    color: "white",
    fontFamily: "SFProText-Semibold",
    fontSize: 24,
    padding: 4,
    textAlign: "center",
  },
});

interface PickerProps {
  defaultValue: number;
  values: { value: number; label: string }[];
}

const Picker = ({ values, defaultValue }: PickerProps) => {
  const value = useValue(defaultValue);
  return (
    <View style={styles.container}>
      {values.map((v, i) => {
        const translateY = interpolate(value, {
          inputRange: [i - 2, i, i + 2],
          outputRange: [0, ITEM_HEIGHT * 2, ITEM_HEIGHT * 4],
        });
        const rotateX = interpolate(value, {
          inputRange: [i - 2, i, i + 2],
          outputRange: [Math.PI / 2, 0, Math.PI / 2],
        });
        const scale = interpolate(value, {
          inputRange: [i - 2, i, i + 2],
          outputRange: [0.8, 1, 0.8],
        });

        return (
          <Animated.View
            key={v.value}
            style={[
              styles.item,
              {
                transform: [{ translateY }, { rotateX }, { scale }],
              },
            ]}
          >
            <Text style={styles.label}>{v.label}</Text>
          </Animated.View>
        );
      })}
      <GestureHandler max={values.length} {...{ value, defaultValue }} />
    </View>
  );
};

export default Picker;
