import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { useColorScheme, Box, Text } from "../components";

import { Telegram as Main } from "./Telegram";

const LeftDrawer = createDrawerNavigator();

const DrawerContent = () => {
  const insets = useSafeAreaInsets();
  const { toggle } = useColorScheme();
  const tap = Gesture.Tap()
    .runOnJS(true)
    .onStart((e) => {
      toggle(e.absoluteX, e.absoluteY);
    });
  return (
    <Box
      flex={1}
      style={{ paddingTop: insets.top }}
      backgroundColor="mainBackground"
    >
      <GestureDetector gesture={tap}>
        <Text variant="header">Hello</Text>
      </GestureDetector>
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
