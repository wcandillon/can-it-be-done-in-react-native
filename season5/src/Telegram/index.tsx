import { createDrawerNavigator } from "@react-navigation/drawer";
import { Button } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColorScheme, Box } from "../components";

import { Telegram as Main } from "./Telegram";

const LeftDrawer = createDrawerNavigator();

const DrawerContent = () => {
  const insets = useSafeAreaInsets();
  const { toggle } = useColorScheme();
  return (
    <Box
      flex={1}
      style={{ paddingTop: insets.top }}
      backgroundColor="mainBackground"
    >
      <Button onPress={toggle} title="Hello" />
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
