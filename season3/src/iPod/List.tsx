import React from "react";
import { StyleSheet, View, processColor } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Animated, { cond, diffClamp } from "react-native-reanimated";
import { between } from "react-native-redash";

const ITEM_HEIGHT = 45;
const blue = processColor("#2980b9");
const white = processColor("white");
const black = processColor("black");
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    height: 45
  },
  icon: {
    paddingHorizontal: 16
  },
  label: {
    fontSize: 16,
    fontFamily: "Chicago"
  }
});

interface Item {
  icon: string;
  label: string;
}

interface ItemProps extends Item {
  active: Animated.Node<0 | 1>;
}

const Item = ({ icon, label, active }: ItemProps) => {
  const backgroundColor = cond(active, blue, white);
  const color = cond(active, white, black);
  return (
    <Animated.View style={[styles.item, { backgroundColor }]}>
      <View>
        <Icon name={icon} color="black" style={styles.icon} size={24} />
        <Animated.View
          style={{ ...StyleSheet.absoluteFillObject, opacity: active }}
        >
          <Icon name={icon} color="white" style={styles.icon} size={24} />
        </Animated.View>
      </View>
      <Animated.Text style={[styles.label, { color }]}>{label}</Animated.Text>
    </Animated.View>
  );
};

interface ListProps {
  items: Item[];
  y: Animated.Node<number>;
}

export default ({ items, y }: ListProps) => {
  const y1 = diffClamp(y, 0, items.length * ITEM_HEIGHT);
  return (
    <View style={styles.container}>
      {items.map((item, key) => (
        <Item
          active={between(y1, key * ITEM_HEIGHT, (key + 1) * ITEM_HEIGHT)}
          {...{ key }}
          {...item}
        />
      ))}
    </View>
  );
};
