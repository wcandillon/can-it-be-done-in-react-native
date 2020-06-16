import React from "react";
import { Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import Row from "./components/Row";
import Option from "./components/Option";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: 111,
    height: 111,
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
        <View>
          <Image source={require("./assets/map.png")} style={styles.map} />
          <View>
            <Text>Nordstrasse</Text>
            <Text>Beautiful Zürich Switzerland</Text>
            <Text>Ring at William</Text>
          </View>
        </View>
        <Row icon="truck" label="Delivery" first />
        <Row icon="clock" label="Delivery Time: 30-50min" />
        <View>
          <Text>Delivery Option</Text>
          <View>
            <Option icon="home" label="Leave at door" />
            <Option icon="user" label="Meet at door" />
          </View>
        </View>
        <View>
          <Text>Your order</Text>
          <Text>Add items</Text>
        </View>
      </View>
    </View>
  );
};

export default UberEatsSwipe;
