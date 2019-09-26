import React, { useState } from "react";
import { StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";

import Chevron from "./Chevron";
import Item, { ListItem } from "./ListItem";

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    backgroundColor: "white",
    padding: 16,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  title: {
    fontSize: 16,
    fontWeight: "bold"
  },
  items: {
    backgroundColor: "white",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16
  }
});

export interface List {
  name: string;
  items: ListItem[];
}

interface ListProps {
  list: List;
}

export default ({ list }: ListProps) => {
  const [open, setOpen] = useState(false);
  const borderBottomLeftRadius = open ? 0 : 8;
  const borderBottomRightRadius = open ? 0 : 8;
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen(prev => !prev)}>
        <View
          style={[
            styles.container,
            { borderBottomLeftRadius, borderBottomRightRadius }
          ]}
        >
          <Text style={styles.title}>Total Points</Text>
          <Chevron {...{ open }} />
        </View>
      </TouchableWithoutFeedback>
      <View
        style={[
          styles.items,
          { height: open ? "auto" : 0, overflow: "hidden" }
        ]}
      >
        {list.items.map((item, key) => (
          <Item {...{ item, key }} />
        ))}
      </View>
    </>
  );
};
