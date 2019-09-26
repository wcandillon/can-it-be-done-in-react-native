import React, { useState } from "react";
import { Text, TouchableWithoutFeedback, View } from "react-native";

import Chevron from "./Chevron";
import Item, { ListItem } from "./ListItem";

export interface List {
  name: string;
  items: ListItem[];
}

interface ListProps {
  list: List;
}

export default ({ list }: ListProps) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setOpen(prev => !prev)}>
        <View>
          <Text>Total Points</Text>
          <Chevron />
        </View>
      </TouchableWithoutFeedback>
      {open && (
        <View>
          {list.items.map((item, key) => (
            <Item {...{ item, key }} />
          ))}
        </View>
      )}
    </>
  );
};
