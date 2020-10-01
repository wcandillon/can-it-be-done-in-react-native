import React from "react";
import { StyleSheet, View, ScrollView, Dimensions } from "react-native";

import { products } from "./Model";
import Card from "./Card";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const PhilzCoffee = () => {
  return (
    <View style={styles.container}>
      <ScrollView decelerationRate="fast" snapToInterval={width} horizontal>
        {products.map((product, index) => (
          <Card product={product} key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default PhilzCoffee;
