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
import ReText from "../components/ReText";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

const formatDatetime = (datetime) => {
  "worklet";
  return `${datetime.getFullYear()}-${
    datetime.getMonth() + 1
  }-${datetime.getDate()} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`;
};

const sayHello = (text, from, cb) => {
  "worklet";
  text.value = `Hello from ${Platform.OS} at ${formatDatetime(new Date())}`;
  cb();
};

const Worklets = () => {
  const [jsText, setJsText] = useState("");
  const text = useSharedValue("");
  const sayHelloOnTheJSThread = () =>
    setJsText(`Hello world at ${formatDatetime(new Date())}`);
  return (
    <View style={styles.container}>
      <Text>JS thread says:</Text>
      <Text>{jsText}</Text>
      <Text>UI thread says:</Text>
      <ReText {...{ text }} />
      <Button
        onPress={() =>
          runOnUI(sayHello)(
            text,
            "Beautiful Zuerich Switzerland",
            sayHelloOnTheJSThread
          )
        }
        label="Say Hello"
        primary
      />
    </View>
  );
};

export default Worklets;
