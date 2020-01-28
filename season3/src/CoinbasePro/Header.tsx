import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  call,
  divide,
  floor,
  modulo,
  onChange,
  sub,
  useCode
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import moment from "moment";

import { SafeAreaView } from "react-native-safe-area-context";
import { Candle } from "./Candle";
import Row from "./Row";

const styles = StyleSheet.create({
  table: {
    flexDirection: "row",
    padding: 16
  },
  date: {
    color: "white",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500"
  },
  column: {
    flex: 1
  },
  separator: {
    width: 16
  }
});

const formatValue = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(value);

interface HeaderProps {
  translateX: Animated.Node<number>;
  caliber: number;
  candles: Candle[];
}

export default ({ translateX, caliber, candles }: HeaderProps) => {
  const [{ date, open, close, high, low, volume }, setCandle] = useState(
    candles[0]
  );
  useCode(
    () =>
      onChange(
        translateX,
        call([floor(divide(translateX, caliber))], ([index]) => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          setCandle(candles[index]);
        })
      ),
    [caliber, candles, translateX]
  );
  const diff = `${((close - open) * 100) / open}`;
  const change = close - open < 0 ? diff.substring(0, 5) : diff.substring(0, 4);
  return (
    <SafeAreaView>
      <View style={styles.table}>
        <View style={styles.column}>
          <Row label="Open" value={formatValue(open)} />
          <Row label="Close" value={formatValue(close)} />
          <Row label="Volume" value={volume} />
        </View>
        <View style={styles.separator} />
        <View style={styles.column}>
          <Row label="High" value={formatValue(high)} />
          <Row label="Low" value={formatValue(low)} />
          <Row
            label="Change"
            value={`${change}%`}
            color={change > 0 ? "#4AFA9A" : "#E33F64"}
          />
        </View>
      </View>
      <Text style={styles.date}>
        {moment(date).format("h:mm MMM Do, YYYY")}
      </Text>
    </SafeAreaView>
  );
};