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

const sayHelloFromTheJSThread = () => "Hello from the JS thread!";

const formatDatetime = (datetime) => {
  "worklet";
  return `${datetime.getFullYear()}-${
    datetime.getMonth() + 1
  }-${datetime.getDate()} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`;
};

const sayHello = (from) => {
  "worklet";
  console.log(`Hello from ${Platform.OS} at ${formatDatetime(new Date())}`);
  const result = sayHelloFromTheJSThread();
  console.log(result);
};

const Worklets = () => {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => runOnUI(sayHello)("Beautiful Zuerich Switzerland")}
        label="Say Hello"
        primary
      />
    </View>
  );
};

export default Worklets;
