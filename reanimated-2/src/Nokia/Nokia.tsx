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
    justifyContent: "center",
  },
});
const Nokia = () => {
  return (
    <View style={styles.phone}>
      <View style={styles.screen}>
        {new Array(HEIGHT).fill(0).map((_0, y) =>
          new Array(WIDTH).fill(0).map((_1, x) => {
            return <Pixel key={`${x}-${y}`} x={x} y={y} />;
          })
        )}
      </View>
    </View>
  );
};

export default Nokia;
