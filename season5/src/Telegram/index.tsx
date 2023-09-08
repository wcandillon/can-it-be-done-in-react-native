import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { Box } from "../components";

import { Telegram as Main } from "./Telegram";
import { ColorSchemeButton } from "./components/ColorSchemeButton";

const LeftDrawer = createDrawerNavigator();

const DrawerContent = () => {
  const insets = useSafeAreaInsets();

  return (
    <Box
      flex={1}
      padding="m"
      style={{ paddingTop: insets.top }}
      backgroundColor="mainBackground"
    >
      <ColorSchemeButton />
    </Box>
  );
};

export const Telegram = () => {
  return (
    <LeftDrawer.Navigator
      screenOptions={{ drawerPosition: "left" }}
      drawerContent={DrawerContent}
    >
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
