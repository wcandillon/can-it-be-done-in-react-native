import React from "react";
import { StyleSheet, ScrollView, Dimensions } from "react-native";
import Animated from "react-native-reanimated";

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
    <Animated.View style={styles.container}>
      <ScrollView decelerationRate="fast" snapToInterval={width} horizontal>
        {products.map((product, index) => (
          <Card product={product} key={index} />
        ))}
      </ScrollView>
    </Animated.View>
  );
};

export default PhilzCoffee;
