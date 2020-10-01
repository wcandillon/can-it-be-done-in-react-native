import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  useDerivedValue,
} from "react-native-reanimated";
import { ReText, Vector, round } from "react-native-redash";

import ETH from "./components/ETH";
import { SIZE } from "./Model";

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  values: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  value: {
    fontWeight: "500",
    fontSize: 24,
  },
  label: {
    fontSize: 18,
  },
});

interface HeaderProps {
  translation: Vector<Animated.SharedValue<number>>;
  minPrice: number;
  maxPrice: number;
}

const Header = ({ translation, minPrice, maxPrice }: HeaderProps) => {
  const price = useDerivedValue(() => {
    const p = interpolate(translation.y.value, [0, SIZE], [maxPrice, minPrice]);
    return `$ ${round(p, 2).toLocaleString("en-US", { currency: "USD" })}`;
  });
  return (
    <View style={styles.container}>
      <ETH />
      <View style={styles.values}>
        <View>
          <ReText style={styles.value} text={price} />
          <Text style={styles.label}>Etherum</Text>
        </View>
        <View>
          <Text style={styles.value}>0.32%</Text>
          <Text style={styles.label}>Today</Text>
        </View>
      </View>
    </View>
  );
};

export default Header;
