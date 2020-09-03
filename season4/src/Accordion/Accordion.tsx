import React from "react";
import { StyleSheet, Text, View } from "react-native";

import List, { List as ListModel } from "./List";

const list: ListModel = {
  name: "Total Points",
  items: [
    { name: "Nathaniel Fitzgerald", points: "$3.45" },
    { name: "Lawrence Fullter Fitzgerald", points: "$3.45" },
    { name: "Jacob Mullins", points: "$3.45" },
    { name: "Jesus Lewis", points: "$3.45" },
    { name: "Johnny Marr", points: "$2.56" },
  ],
};

const list2: ListModel = {
  name: "Total Points",
  items: [
    { name: "Nathaniel Fitzgerald", points: "$3.45" },
    { name: "Lawrence Fullter Fitzgerald", points: "$3.45" },
    { name: "Jacob Mullins", points: "$3.45" },
  ],
};

const list3: ListModel = {
  name: "Total Points",
  items: [
    { name: "Nathaniel Fitzgerald", points: "$3.45" },
    { name: "Lawrence Fullter Fitzgerald", points: "$3.45" },
  ],
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f6",
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
});

const Accordion = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Markets</Text>
      <List {...{ list }} />
      <List list={list2} />
      <List list={list3} />
      <List {...{ list }} />
      <List {...{ list }} />
      <List {...{ list }} />
    </View>
  );
};

export default Accordion;
