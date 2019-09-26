import React from "react";
import { StyleSheet, Text, View } from "react-native";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#f4f4f6"
  },
  name: {
    fontSize: 16
  },
  pointsContainer: {
    borderRadius: 8,
    backgroundColor: "#44c282",
    padding: 8
  },
  points: {
    color: "white",
    fontWeight: "bold"
  }
});

export interface ListItem {
  name: string;
  points: string;
}

interface ListItemProps {
  item: ListItem;
}

export default ({ item }: ListItemProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>{item.points}</Text>
      </View>
    </View>
  );
};
