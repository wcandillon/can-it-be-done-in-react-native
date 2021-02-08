import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { Button } from '../components';
import Basil from "./components/Basil"
import { PIZZA_SIZE, BREAD_PADDING } from './Config';

export const assets = {
  plate: require("./assets/Plate.png"),
  bread: [
    require("./assets/Bread/Bread_1.png")
  ],  
  basil: [
    require("./assets/Basil/Basil_1.png"),
    require("./assets/Basil/Basil_2.png"),
    require("./assets/Basil/Basil_3.png"),
    require("./assets/Basil/Basil_4.png"),
    require("./assets/Basil/Basil_5.png"),
    require("./assets/Basil/Basil_6.png"),
    require("./assets/Basil/Basil_7.png"),
    require("./assets/Basil/Basil_8.png"),
    require("./assets/Basil/Basil_9.png"),
    require("./assets/Basil/Basil_10.png"),
    require("./assets/Basil/Basil_11.png"),
  ]
}

const styles = StyleSheet.create({
  container: {
    padding: 32,
    flex: 1,
    alignItems: "center",
  },
  pizza: {
    width: PIZZA_SIZE,
    height: PIZZA_SIZE
  },
  plate: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
  bread: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    top: BREAD_PADDING,
    left: BREAD_PADDING,
    right: BREAD_PADDING,
    bottom: BREAD_PADDING
  }
});
const PizzaChallenge = () => {
  const basil = useSharedValue(0);
  return (
    <View style={styles.container}>
      <View style={styles.pizza}>
        <Image source={assets.plate} style={styles.plate} />
        <Image source={assets.bread[0]} style={styles.bread} />
        <Basil progress={basil} assets={assets.basil} />
      </View>
      <Button label="Top Me!" onPress={() => basil.value = withTiming(1)}></Button>
    </View>
  );
}


export default PizzaChallenge;
