import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";

import Screen from "./Screen";

interface ComponentNameProps {}

const { width } = Dimensions.get("window");
const perspective = { perspective: 1000 };
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black"
  }
});

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          transform: [
            perspective,
            { translateX: width / 2 },
            { rotateY: open ? "-45deg" : "0deg" },
            { translateX: -width / 2 },
            { scale: open ? 0.95 : 1 }
          ]
        }}
      >
        <Screen onPress={() => setOpen(prev => !prev)} />
      </View>
    </View>
  );
};
