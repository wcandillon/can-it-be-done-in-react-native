import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import Animated, {
  interpolate,
  Extrapolate,
  multiply,
  cos,
  sub,
  asin,
  divide,
} from "react-native-reanimated";
import { useValue, translateZ } from "react-native-redash";
import MaskedView from "@react-native-community/masked-view";

import { VISIBLE_ITEMS, ITEM_HEIGHT } from "./Constants";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: 0.61 * width,
    height: ITEM_HEIGHT * VISIBLE_ITEMS,
    overflow: "hidden",
  },
  item: {
    height: ITEM_HEIGHT,
    justifyContent: "center",
  },
  label: {
    color: "white",
    fontFamily: "SFProText-Semibold",
    fontSize: 24,
    lineHeight: ITEM_HEIGHT,
    textAlign: "center",
    textAlignVertical: "center",
  },
});
const perspective = 600;
const RADIUS_REL = VISIBLE_ITEMS * 0.5;
const RADIUS = RADIUS_REL * ITEM_HEIGHT;

interface PickerProps {
  defaultValue: number;
  values: { value: number; label: string }[];
}

const Picker = ({ values, defaultValue }: PickerProps) => {
  return (
    <View style={styles.container}>
      {values.map((v, i) => {
        return (
          <View key={v.value} style={[styles.item]}>
            <Text style={styles.label}>{v.label}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default Picker;
