import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Animated, {
  interpolate,
  Extrapolate,
  multiply,
  cos,
  useCode,
  sin,
  sub,
} from "react-native-reanimated";
import { useValue, translateZ, useDebug } from "react-native-redash";

import GestureHandler from "./GestureHandler";
import { VISIBLE_ITEMS, ITEM_HEIGHT } from "./Constants";

const styles = StyleSheet.create({
  container: {
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
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
const perspective = 600;
const RADIUS_RELATIVE = 5;
const RADIUS = RADIUS_RELATIVE * ITEM_HEIGHT;

interface PickerProps {
  defaultValue: number;
  values: { value: number; label: string }[];
}

const Picker = ({ values, defaultValue }: PickerProps) => {
  const value = useValue(defaultValue);
  return (
    <View style={styles.container}>
      {values.map((v, i) => {
        const rotateX = interpolate(value, {
          inputRange: [i - RADIUS_RELATIVE, i, i + RADIUS_RELATIVE],
          outputRange: [-Math.PI / 2, 0, Math.PI / 2],
          extrapolate: Extrapolate.CLAMP,
        });
        const translateY = multiply(RADIUS, sin(rotateX));
        const z = sub(multiply(RADIUS, cos(rotateX)), RADIUS);
        return (
          <Animated.View
            key={v.value}
            style={[
              styles.item,
              {
                transform: [
                  { perspective },
                  { translateY },
                  { rotateX },
                  translateZ(perspective, z),
                ],
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
