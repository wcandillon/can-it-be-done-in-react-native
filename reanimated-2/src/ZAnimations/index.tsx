import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Examples as ExamplesRoutes } from "../Routes";

import Examples from "./Examples";
import Arc from "./Arc";
import Donut from "./Donut";

export type Routes = {
  Examples: undefined;
  Arc: undefined;
};

const Stack = createStackNavigator<ExamplesRoutes>();

const ExampleNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Examples"
      component={Examples}
      options={{
        title: "3D Examples",
      }}
    />
    <Stack.Screen
      name="Donut"
      component={Donut}
      options={{
        title: "🍩 Domut",
      }}
    />
    <Stack.Screen
      name="Arc"
      component={Arc}
      options={{
        title: "🌈 Rainbow",
      }}
    />
  </Stack.Navigator>
);

export default ExampleNavigator;
