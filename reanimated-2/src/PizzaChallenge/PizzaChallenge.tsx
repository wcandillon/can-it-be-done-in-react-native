import React, { useState } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import { Button } from '../components';
import Ingredients from "./components/Ingredients"
import { PIZZA_SIZE, BREAD_PADDING, assets } from './Config';

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
  const [count, setCount] = useState(0);
  const [basil, setBasil] = useState<null | number>(null);
  const [sausage, setSausage] = useState<null | number>(null);
  return (
    <View style={styles.container}>
      <View style={styles.pizza}>
        <Image source={assets.plate} style={styles.plate} />
        <Image source={assets.bread[0]} style={styles.bread} />
        {
          basil !== null && <Ingredients zIndex={basil} assets={assets.basil} />
        }
                {
          sausage !== null && <Ingredients zIndex={sausage} assets={assets.sausage} />
        }
      </View>
      <Button label="Top Basil" onPress={() => {
        setCount(prev => prev + 1);
        setBasil(count + 1);
      }}></Button>
      <Button label="Top Sausage" onPress={() => {
        setCount(prev => prev + 1);
        setSausage(count + 1);
      }}></Button>
    </View>
  );
}


export default PizzaChallenge;
