import type {
  DrawerActionHelpers,
  ParamListBase,
} from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Button, View } from "react-native";

export const Telegram = () => {
  const navigation = useNavigation() as DrawerActionHelpers<ParamListBase>;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button onPress={() => navigation.openDrawer()} title="Open drawer" />
    </View>
  );
};
