import React from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Row from "./components/Row";
import Option from "./components/Option";

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginTop: 16,

    color: "#20A454",
    fontFamily: "UberMoveMedium",
    fontSize: 16,
  },
});

const UberEatsSwipe = () => {
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
    </View>
  );
};

export default UberEatsSwipe;
