import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import Animated, {
  useSharedValue,
  runOnUI,
  runOnJS,
} from "react-native-reanimated";
import { ReText } from "react-native-redash";

import { Button } from "../components";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});

const formatDatetime = (datetime: Date) => {
  "worklet";
  return `${datetime.getFullYear()}-${
    datetime.getMonth() + 1
  }-${datetime.getDate()} ${datetime.getHours()}:${datetime.getMinutes()}:${datetime.getSeconds()}`;
};

const sayHello = (
  text: Animated.SharedValue<string>,
  from: string,
  cb: () => void
) => {
  "worklet";
  text.value = `Hello from ${from} at ${formatDatetime(new Date())}`;
  runOnJS(cb)();
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
