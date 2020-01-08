import React from "react";
import { Value, set, useCode } from "react-native-reanimated";
import { withTransition } from "react-native-redash";
import { StyleSheet, View } from "react-native";

import CircularProgress from "./CircularProgress";
import { COLOR_BG, COLOR_END, COLOR_START, RADIUS } from "./Constants";
import AngularGradient from "../components/AngularGradient";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000001"
  }
});

export default () => {
  const progress = new Value(0);
  useCode(() => set(progress, 2.5), [progress]);
  return (
    <View style={styles.container}>
      <CircularProgress
        progress={withTransition(progress, { duration: 10000 })}
        fg={(flipped?: boolean) => (
          <AngularGradient
            size={RADIUS * 2}
            colors={flipped ? ["blue", "red"] : ["red", "blue"]}
          />
        )}
        bg={<View style={{ flex: 1, backgroundColor: COLOR_BG }} />}
      />
    </View>
  );
};
