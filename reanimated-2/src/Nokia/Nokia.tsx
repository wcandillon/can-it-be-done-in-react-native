import React from "react";
import { StyleSheet, View } from "react-native";

import Pixel, { HEIGHT, WIDTH } from "./Pixel";

const styles = StyleSheet.create({
  phone: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screen: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
const Nokia = () => {
  return (
    <View style={styles.phone}>
      <View style={styles.screen}>
        {new Array(HEIGHT * WIDTH).fill(0).map((_, i) => {
          const x = i % WIDTH;
          const y = Math.floor(i / WIDTH);
          return <Pixel key={i} x={x} y={y} />;
        })}
      </View>
    </View>
  );
};

export default Nokia;
