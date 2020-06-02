import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnUI,
} from "react-native-reanimated";

import { Button, StyleGuide } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

const Worklets = () => {
  const translateX = useSharedValue(0);
  const style = useAnimatedStyle(() => {
    return {
      width: 100,
      height: 100,
      backgroundColor: StyleGuide.palette.primary,
      transform: [{ translateX: translateX.value }],
    };
  });

  const sayHelloOnJSThread = () => {
    console.log("This runs on the UI thread");
    translateX.value += 50;
  };

  const sayHello = (name) => {
    "worklet";
    console.log(`hello ${name} from ${Platform.OS}`);
    sayHelloOnJSThread();
  };

  return (
    <View style={styles.container}>
      <Animated.View style={style} />
      <Button
        label="Run on the UI thread"
        primary
        onPress={() => {
          runOnUI(sayHello)("World");
        }}
      />
    </View>
  );
};

export default Worklets;
