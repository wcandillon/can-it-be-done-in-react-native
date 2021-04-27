import React, { useState } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

import Header, { HEADER_HEIGHT } from "./components/Header";
import Ingredients from "./components/Ingredients";
import IngredientSelection from "./components/IngredientSelection";
import {
  PIZZA_SIZE,
  BREAD_PADDING,
  PADDING,
  assets,
  defaultState,
} from "./Config";

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#F9F5F2",
    alignItems: "center",
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
  },
  content: {
    marginTop: PIZZA_SIZE + PADDING * 2 + HEADER_HEIGHT,
  },
  pizza: {
    margin: 32,
    width: PIZZA_SIZE,
    height: PIZZA_SIZE,
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
    bottom: BREAD_PADDING,
  },
});

const PizzaChallenge = () => {
  const [state, setState] = useState(defaultState);
  const selected = useSharedValue(false);
  const style = useAnimatedStyle(() => ({
    transform: [{ scale: withTiming(selected.value ? 1.05 : 1) }],
  }));
  return (
    <View style={styles.root}>
      <Animated.View style={[styles.pizza, style]}>
        <Image source={assets.plate} style={styles.plate} />
        <Image source={assets.bread[0]} style={styles.bread} />
        <Ingredients zIndex={state.basil} assets={assets.basil} />
        <Ingredients zIndex={state.sausage} assets={assets.sausage} />
        <Ingredients zIndex={state.sausage} assets={assets.sausage} />
        <Ingredients zIndex={state.onion} assets={assets.onion} />
        <Ingredients zIndex={state.broccoli} assets={assets.broccoli} />
        <Ingredients zIndex={state.mushroom} assets={assets.mushroom} />
      </Animated.View>
      <Header />
      <View style={styles.container}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.content}
          horizontal
        >
          <IngredientSelection
            asset={assets.basil[2]}
            ingredient="basil"
            state={[state, setState]}
            selected={selected}
          />
          <IngredientSelection
            asset={assets.sausage[3]}
            ingredient="sausage"
            state={[state, setState]}
            selected={selected}
          />
          <IngredientSelection
            asset={assets.onion[1]}
            ingredient="onion"
            state={[state, setState]}
            selected={selected}
          />
          <IngredientSelection
            asset={assets.broccoli[1]}
            ingredient="broccoli"
            state={[state, setState]}
            selected={selected}
          />
          <IngredientSelection
            asset={assets.mushroom[1]}
            ingredient="mushroom"
            state={[state, setState]}
            selected={selected}
          />
        </ScrollView>
      </View>
    </View>
  );
};

export default PizzaChallenge;
