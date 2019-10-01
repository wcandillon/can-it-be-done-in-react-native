import React, { useRef } from "react";
import { StyleSheet, Text } from "react-native";

import {
  Transition,
  Transitioning,
  TransitioningView
} from "react-native-reanimated";
import List, { List as ListModel } from "./List";

const list: ListModel = {
  name: "Total Points",
  items: [
    { name: "Nathaniel Fitzgerald", points: "$3.45" },
    { name: "Lawrence Fullter Fitzgerald", points: "$3.45" },
    { name: "Jacob Mullins", points: "$3.45" },
    { name: "Jesus Lewis", points: "$3.45" },
    { name: "Johnny Marr", points: "$2.56" }
  ]
};

const transition = (
  <Transition.Change durationMs={400} interpolation="easeInOut" />
);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f6",
    padding: 16
  },
  title: {
    fontSize: 32,
    fontWeight: "bold"
  }
});

export default () => {
  const ref = useRef<TransitioningView>(null);
  return (
    <Transitioning.View style={styles.container} {...{ ref, transition }}>
      <Text style={styles.title}>Markets</Text>
      <List transition={ref} {...{ list }} />
      <List transition={ref} {...{ list }} />
      <List transition={ref} {...{ list }} />
      <List transition={ref} {...{ list }} />
      <List transition={ref} {...{ list }} />
      <List transition={ref} {...{ list }} />
    </Transitioning.View>
  );
};
