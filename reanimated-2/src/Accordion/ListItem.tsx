import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const LIST_ITEM_HEIGHT = 54;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: "#f4f4f6",
    height: LIST_ITEM_HEIGHT,
  },
  name: {
    fontSize: 16,
  },
  pointsContainer: {
    borderRadius: 8,
    backgroundColor: "#44c282",
    padding: 8,
  },
  points: {
    color: "white",
    fontWeight: "bold",
  },
});

export interface ListItem {
  name: string;
  points: string;
}

interface ListItemProps {
  item: ListItem;
  isLast: boolean;
}

const ListItem = ({ item, isLast }: ListItemProps) => {
  const bottomRadius = isLast ? 8 : 0;
  return (
    <View
      style={[
        styles.container,
        {
          borderBottomLeftRadius: bottomRadius,
          borderBottomRightRadius: bottomRadius,
        },
      ]}
    >
      <Text style={styles.name}>{item.name}</Text>
      <View style={styles.pointsContainer}>
        <Text style={styles.points}>{item.points}</Text>
      </View>
    </View>
  );
};

export default ListItem;
