import type {
  DrawerActionHelpers,
  ParamListBase,
} from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, ScrollView } from "react-native";
import { useTheme } from "@shopify/restyle";

import { useColorScheme, type Theme, Box } from "../components";

import { Header } from "./components";

export const Telegram = () => {
  const { toggle } = useColorScheme();
  //const navigation = useNavigation() as DrawerActionHelpers<ParamListBase>;
  //const theme = useTheme<Theme>();
  return (
    <Box flex={1} backgroundColor="mainBackground">
      <Header />
      <Button onPress={toggle} title="Hello" />
    </Box>
  );
};
