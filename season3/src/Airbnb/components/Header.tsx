import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
  },
  icon: {
    marginRight: 8,
  },
  chips: {
    flexDirection: "row",
  },
  chip: {
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "black",
    padding: 8,
    marginRight: 8,
  },
  label: {
    fontFamily: "CerealBook",
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 16,
  },
  title: {
    fontFamily: "CerealMedium",
    fontSize: 22,
    marginTop: 16,
  },
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
        <Icon name="arrow-left" size={24} style={styles.icon} />
        <Text>Anywhere · Stay</Text>
      </View>
      <View style={styles.chips}>
        <Chip label="Dates" />
        <Chip label="Guests" />
        <Chip label="Filters" />
      </View>
      <Text style={styles.title}>300+ places to stay</Text>
    </View>
  );
};
