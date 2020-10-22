import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Examples as ExamplesRoutes } from "../Routes";

import Examples from "./Examples";
import Arc from "./Arc";

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
      name="Arc"
      component={Arc}
      options={{
        title: "Arc",
      }}
    />
  </Stack.Navigator>
);

export default ExampleNavigator;
