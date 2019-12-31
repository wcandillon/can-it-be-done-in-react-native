import React from "react";
import { StyleSheet, View } from "react-native";

import { Command, useOnPress } from "../ClickWheel";
import { CONTENT_HEIGHT } from "../IPodNavigator";
import Item, { Item as ItemModel } from "./Item";

const ITEM_HEIGHT = 45;
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

interface ListProps {
  items: ItemModel[];
}

export default ({ items }: ListProps) => {
  return (
    <View style={styles.container}>
      <View>
        {items.map((item, key) => (
          <Item
            onPress={n => n.navigate(item.screen, item.params)}
            {...{ key }}
            {...item}
          />
        ))}
      </View>
    </View>
  );
};
