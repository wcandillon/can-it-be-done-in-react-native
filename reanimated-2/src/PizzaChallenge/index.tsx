import React from "react";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";

import { assets as pizzaAsset, PizzaChallengeRoutes } from "./Config";
import Pizzas from "./Pizzas";
import Pizza from "./Pizza";

const Stack = createSharedElementStackNavigator<PizzaChallengeRoutes>();
const Navigator = () => (
  <Stack.Navigator
    screenOptions={{
      gestureEnabled: false,
      headerShown: false,
      cardOverlayEnabled: true,
      cardStyle: { backgroundColor: "transparent" },
    }}
    mode="modal"
  >
    <Stack.Screen name="Pizzas" component={Pizzas} />
    <Stack.Screen
      name="Pizza"
      component={Pizza}
      sharedElements={(route) => {
        const { id } = route.params;
        return [id];
      }}
    />
  </Stack.Navigator>
);

export default Navigator;

export const assets = Object.values(pizzaAsset).map((asset) =>
  Array.isArray(asset) ? asset.flat() : asset
);
