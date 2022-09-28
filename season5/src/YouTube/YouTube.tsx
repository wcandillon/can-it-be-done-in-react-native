import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";

import { Home } from "./Home";
import { TabBar } from "./TabBar";

const Tab = createBottomTabNavigator();

export const YouTube = () => {
  return (
    <Tab.Navigator tabBar={() => <TabBar />}>
      <Tab.Screen name="Home" component={Home} />
    </Tab.Navigator>
  );
};
