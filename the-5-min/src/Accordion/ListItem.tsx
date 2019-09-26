import React from "react";
import { Text, View } from "react-native";

export interface ListItem {
  name: string;
  points: string;
}

interface ListItemProps {
  item: ListItem;
}

export default ({ item }: ListItemProps) => {
  return (
    <View>
      <Text>{item.name}</Text>
      <View>
        <Text>{item.points}</Text>
      </View>
    </View>
  );
};
