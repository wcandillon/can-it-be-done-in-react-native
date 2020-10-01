import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { Vector } from "react-native-redash";

import ETH from "./components/ETH";

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
}

const Header = ({ translation }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <ETH />
      <View style={styles.values}>
        <View>
          <Text style={styles.value}>$382.23</Text>
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
