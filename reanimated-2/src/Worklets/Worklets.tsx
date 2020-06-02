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
  useAnimatedProps,
  runOnUI,
} from "react-native-reanimated";

import { Button } from "../components";

const sayHelloOnJSThread = () => {
  Alert.alert(
    "We said hello on the UI thread and asynchronously called back on the JS thread"
  );
};

const sayHello = (name) => {
  "worklet";
  console.log(`hello ${name} from ${Platform.OS}`);
  sayHelloOnJSThread();
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

const Worklets = () => {
  return (
    <View style={styles.container}>
      <Button
        label="Say Hello on the UI thread"
        primary
        onPress={() => runOnUI(sayHello)("World")}
      />
    </View>
  );
};

export default Worklets;
