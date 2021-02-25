import { NavigationProp, RouteProp } from "@react-navigation/native";
import React, { useState } from "react";
import { View, Image, StyleSheet, ScrollView } from "react-native";
import Animated, {
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { mix } from "react-native-redash";
import { SharedElement } from "react-navigation-shared-element";

import { Button } from "../components";

import Header, { HEADER_HEIGHT } from "./components/Header";
import Ingredients from "./components/Ingredients";
import IngredientSelection from "./components/IngredientSelection";
import PizzaBox from "./components/PizzaBox";
import Checkout from "./components/Checkout";
import {
  PIZZA_SIZE,
  BREAD_PADDING,
  PADDING,
  assets,
  defaultState,
  PizzaChallengeRoutes,
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

interface PizzaProps {
  navigation: NavigationProp<PizzaChallengeRoutes, "Pizza">;
  route: RouteProp<PizzaChallengeRoutes, "Pizza">;
}

const Pizza = ({ route }: PizzaProps) => {
  const checkout = useSharedValue(0);
  const added = useSharedValue(0);
  const [active, setActive] = useState(false);
  const [state, setState] = useState(defaultState);
  const selected = useSharedValue(false);
  const { id } = route.params;
  const style = useAnimatedStyle(() => ({
    opacity: mix(checkout.value, 1, 0),
    transform: [
      { scale: withTiming(selected.value ? 1.05 : 1) },
      { scale: mix(checkout.value, 1, 0) },
    ],
  }));
  useAnimatedReaction(
    () => checkout.value >= 0.4,
    (v) => {
      if (v) {
        runOnJS(setActive)(true);
      }
    }
  );
  const pizzaBox = useAnimatedStyle(() => ({
    opacity:
      checkout.value === 0
        ? 0
        : interpolate(added.value, [0, 0.75, 1], [1, 1, 0], Extrapolate.CLAMP),
    transform: [
      { translateX: mix(added.value, 0, PIZZA_SIZE / 2) },
      { translateY: mix(added.value, 0, -PIZZA_SIZE / 2) },
      { scale: mix(added.value, 1, 0.5) },
    ],
  }));
  return (
    <View style={styles.root}>
      <View>
        <Checkout active={active} />
        <Animated.View style={[StyleSheet.absoluteFill, pizzaBox]}>
          <PizzaBox active={active} />
        </Animated.View>
        <SharedElement id={id}>
          <Animated.View style={[styles.pizza, style]}>
            <Image source={assets.plate} style={styles.plate} />
            <Image
              source={assets.pizza[parseInt(id, 10)]}
              style={styles.bread}
            />
            <Ingredients zIndex={state.basil} assets={assets.basil} />
            <Ingredients zIndex={state.sausage} assets={assets.sausage} />
            <Ingredients zIndex={state.sausage} assets={assets.sausage} />
            <Ingredients zIndex={state.onion} assets={assets.onion} />
            <Ingredients zIndex={state.broccoli} assets={assets.broccoli} />
            <Ingredients zIndex={state.mushroom} assets={assets.mushroom} />
          </Animated.View>
        </SharedElement>
      </View>
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
        <Button
          onPress={() =>
            (checkout.value = withTiming(
              1,
              { duration: 500 },
              () => (added.value = withTiming(1))
            ))
          }
          label="Checkout"
          primary
        />
      </View>
    </View>
  );
};

export default Pizza;
