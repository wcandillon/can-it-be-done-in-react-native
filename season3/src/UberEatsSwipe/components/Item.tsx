import React from "react";
import { StyleSheet, View } from "react-native";
import Animated from "react-native-reanimated";
import ItemLayout, { ItemModel } from "./ItemLayout";

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#E1E2E3",
  },
});

interface ItemProps {
  item: ItemModel;
}

const Item = ({ item }: ItemProps) => {
  return (
    <Animated.View>
      <View style={styles.background}>
        <View />
      </View>
      <Animated.View>
        <ItemLayout {...{ item }} />
      </Animated.View>
    </Animated.View>
  );
};

export default Item;
