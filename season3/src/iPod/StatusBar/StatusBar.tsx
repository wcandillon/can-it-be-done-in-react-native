import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import Battery from "./Battery";

const useInterval = (callback: () => void, delay: number) => {
  useEffect(() => {
    const id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [callback, delay]);
};
const format = (n: number) => `${n}`.padStart(2, "0");
export const STATUS_BAR_HEIGHT = 32;
const styles = StyleSheet.create({
  container: {
    height: STATUS_BAR_HEIGHT,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  flex: {
    flex: 1,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  battery: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  time: {
    fontFamily: "Chicago",
    textAlign: "center",
  },
});

export default () => {
  const [now, setNow] = useState(new Date());
  useInterval(() => setNow(new Date()), 10000);
  return (
    <View style={styles.container}>
      <View style={styles.flex} />
      <View style={styles.flex}>
        <Text style={styles.time}>
          {`${format(now.getHours())}:${format(now.getMinutes())}`}
        </Text>
      </View>
      <View style={styles.battery}>
        <Battery />
      </View>
    </View>
  );
};
