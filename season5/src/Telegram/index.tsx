import { createDrawerNavigator } from "@react-navigation/drawer";

import { Telegram as Main } from "./Telegram";

const LeftDrawer = createDrawerNavigator();

export const Telegram = () => {
  return (
    <LeftDrawer.Navigator screenOptions={{ drawerPosition: "left" }}>
      <LeftDrawer.Screen
        name="Main"
        component={Main}
        options={{
          headerShown: false,
        }}
      />
    </LeftDrawer.Navigator>
  );
};
