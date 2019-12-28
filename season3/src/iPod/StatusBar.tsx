import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

const useInterval = (callback: () => void, delay: number) => {
  useEffect(() => {
    const id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [callback, delay]);
};
const format = (n: number) => `${n}`.padStart(2, "0");
const styles = StyleSheet.create({
  container: {
    height: 32,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  time: {
    fontFamily: "Chicago"
  }
});

export default () => {
  const [now, setNow] = useState(new Date());
  useInterval(() => setNow(new Date()), 10000);
  return (
    <View style={styles.container}>
      <View />
      <Text style={styles.time}>
        {`${format(now.getHours())}:${format(now.getMinutes())}`}
      </Text>
      <View />
    </View>
  );
};
