import { createDrawerNavigator } from "@react-navigation/drawer";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Box, Text } from "../components";

import { Telegram as Main } from "./Telegram";
import { ColorSchemeButton } from "./components/ColorSchemeButton";
import { Avatar } from "./components/Avatar";
import { DrawerItem } from "./components/DrawerItem";

const LeftDrawer = createDrawerNavigator();

const DrawerContent = () => {
  const insets = useSafeAreaInsets();

  return (
    <Box flex={1} backgroundColor="mainBackground">
      <Box padding="m" style={{ paddingTop: insets.top }}>
        <Box flexDirection="row" justifyContent="space-between">
          <Box>
            <Avatar id="derek.russel" />
            <Text variant="header">Derek Russel</Text>
          </Box>
          <Box>
            <ColorSchemeButton />
          </Box>
        </Box>
      </Box>
      <DrawerItem label="New Group" icon="users" />
      <DrawerItem label="New Secret Chat" icon="lock" />
      <DrawerItem label="New Channel" icon="speaker" />
      <DrawerItem label="Contacts" icon="user" />
      <DrawerItem label="Calls" icon="phone" />
      <DrawerItem label="Saved Messages" icon="bookmark" />
      <DrawerItem label="Settings" icon="settings" />
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
