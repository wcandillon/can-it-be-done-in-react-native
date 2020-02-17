import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    padding: 16,
    alignSelf: "stretch"
  },
  chips: {
    flexDirection: "row"
  },
  chip: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    marginRight: 4
  },
  label: {
    fontFamily: "CerealBook"
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    padding: 8,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 16
  }
});

const Chip = ({ label }: { label: string }) => (
  <View style={styles.chip}>
    <Text style={styles.label}>{label}</Text>
  </View>
);

export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Icon name="arrow-left" />
        <Text>Anywhere Stay</Text>
      </View>
      <View style={styles.chips}>
        <Chip label="Dates" />
        <Chip label="Guests" />
        <Chip label="Filters" />
      </View>
    </View>
  );
};
