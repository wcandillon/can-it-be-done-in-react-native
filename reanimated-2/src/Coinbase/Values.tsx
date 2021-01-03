import React from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, { useDerivedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";

import Row from "./Row";
import { CANDLES, STEP, formatDatetime, formatUSD } from "./ChartHelpers";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  table: {
    flexDirection: "row",
    padding: 16,
  },
  date: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
  },
  column: {
    flex: 1,
  },
  separator: {
    width: 16,
  },
});

interface ValuesProps {
  translateX: Animated.SharedValue<number>;
}

const Values = ({ translateX }: ValuesProps) => {
  const candle = useDerivedValue(() => {
    const c = CANDLES[Math.floor(translateX.value / STEP)];
    return c;
  });
  const open = useDerivedValue(() => `${formatUSD(candle.value.open)}`);
  const close = useDerivedValue(() => `${formatUSD(candle.value.close)}`);
  const low = useDerivedValue(() => `${formatUSD(candle.value.low)}`);
  const high = useDerivedValue(() => `${formatUSD(candle.value.high)}`);
  const diff = useDerivedValue(
    () =>
      `${((candle.value.close - candle.value.open) * 100) / candle.value.open}`
  );
  const change = useDerivedValue(
    () =>
      `${
        candle.value.close - candle.value.open < 0
          ? diff.value.substring(0, 5)
          : diff.value.substring(0, 4)
      }%`
  );
  const white = useDerivedValue(() => "#ffffff");
  const color = useDerivedValue(() =>
    candle.value.close - candle.value.open > 0 ? "#4AFA9A" : "#E33F64"
  );
  const date = useDerivedValue(() => formatDatetime(candle.value.date));
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.table}>
        <View style={styles.column}>
          <Row label="Open" value={open} color={white} />
          <Row label="Close" value={close} color={white} />
        </View>
        <View style={styles.separator} />
        <View style={styles.column}>
          <Row label="High" value={high} color={white} />
          <Row label="Low" value={low} color={white} />
          <Row label="Change" value={change} color={color} />
        </View>
      </View>
      <ReText style={styles.date} text={date} />
    </SafeAreaView>
  );
};

export default Values;
