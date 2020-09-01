import React, { useState } from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";

import Row from "./components/Row";
import Option from "./components/Option";
import Item from "./components/Item";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  title: {
    fontFamily: "UberMoveMedium",
    fontSize: 16,
    textAlign: "center",
  },
  restaurant: {
    fontFamily: "UberMoveMedium",
    fontSize: 24,
    textAlign: "center",
    marginVertical: 16,
  },
  divider: {
    height: 2,
    backgroundColor: "#e2e3e4",
    width: 50,
    marginVertical: 16,
    alignSelf: "center",
  },
  content: {
    marginHorizontal: 16,
  },
  address: {
    flexDirection: "row",
    marginBottom: 16,
    alignItems: "center",
  },
  map: {
    width: 111,
    height: 111,
    marginRight: 16,
  },
  headline: {
    fontFamily: "UberMoveRegular",
    fontSize: 18,
    marginBottom: 8,
  },
  body: {
    fontFamily: "UberMoveRegular",
    fontSize: 16,
    color: "#545556",
    lineHeight: 22,
  },
  subtitle: {
    marginTop: 16,
    fontFamily: "UberMoveMedium",
    fontSize: 16,
  },
  deliveryOptions: {
    flexDirection: "row",
    marginVertical: 8,
  },
  orderTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  primary: {
    marginVertical: 16,
    color: "#20A454",
    fontFamily: "UberMoveMedium",
    fontSize: 16,
  },
});

const defaultItems = [
  {
    key: "0",
    title: "Herb Tonic",
    price: 10.0,
    quantity: 1,
  },
  {
    key: "1",
    title: "Spicy Tuna",
    price: 12.8,
    quantity: 1,
  },
  {
    key: "2",
    title: "Tunacado",
    price: 10.2,
    quantity: 1,
  },
  {
    key: "3",
    title: "Power Shake",
    price: 10,
    quantity: 1,
  },
  {
    key: "4",
    title: "Power Shake",
    price: 10,
    quantity: 1,
  },
  {
    key: "5",
    title: "Power Shake",
    price: 10,
    quantity: 1,
  },
  {
    key: "6",
    title: "Power Shake",
    price: 10,
    quantity: 2,
  },
];

const UberEatsSwipe = () => {
  const [items, setItems] = useState(defaultItems);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <Text style={styles.title}>Your basket</Text>
      </SafeAreaView>
      <Text style={styles.restaurant}>Joe & the Juice</Text>
      <View style={styles.divider} />
      <View style={styles.content}>
        <View style={styles.address}>
          <Image source={require("./assets/map.png")} style={styles.map} />
          <View>
            <Text style={styles.headline}>Nordstrasse</Text>
            <Text style={styles.body}>Beautiful Zürich Switzerland</Text>
            <Text style={styles.body}>Ring at William</Text>
          </View>
        </View>
        <Row icon="truck" label="Delivery" first />
        <Row icon="clock" label="Delivery Time: 30-50min" />
        <Text style={styles.subtitle}>Delivery Option</Text>
        <View style={styles.deliveryOptions}>
          <Option icon="home" label="Leave at door" />
          <Option icon="user" label="Meet at door" selected />
        </View>
        <View>
          <View style={styles.orderTitle}>
            <Text style={styles.subtitle}>Your order</Text>
            <Text style={styles.primary}>Add items</Text>
          </View>
        </View>
      </View>
      <View style={{ paddingRight: 16 }}>
        <FlatList
          data={items}
          renderItem={({ item }) => (
            <Item
              onSwipe={() => {
                const newItems = [...items];
                newItems.splice(newItems.indexOf(item), 1);
                setItems(newItems);
              }}
              {...{ item }}
            />
          )}
        />
      </View>
    </View>
  );
};

export default UberEatsSwipe;
