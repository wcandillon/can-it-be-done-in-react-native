import React from "react";
import { StyleSheet, View } from "react-native";
import { TapGestureHandler } from "react-native-gesture-handler";
import Animated, { Value } from "react-native-reanimated";

import Button from "./Button";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EDFF",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default () => {
  const progress = new Value(0);
  return (
    <View style={styles.container}>
      <TapGestureHandler>
        <Animated.View>
          <Button {...{ progress }} />
        </Animated.View>
      </TapGestureHandler>
    </View>
  );
};
