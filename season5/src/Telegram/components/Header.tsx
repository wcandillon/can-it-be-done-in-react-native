import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { TextInput, View } from "react-native";
import type {
  DrawerActionHelpers,
  ParamListBase,
} from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

import { Box, Text, useTheme } from "../../components";

import { Avatar } from "./Avatar";
import { IconButton } from "./IconButton";

export const Header = () => {
  const theme = useTheme();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation() as DrawerActionHelpers<ParamListBase>;
  return (
    <View>
      <View
        style={{
          marginTop: insets.top,
          padding: theme.spacing.m,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Box flexDirection="row">
          <Avatar id="derek.russel" />
          <Text variant="header" marginLeft="s">
            Chats
          </Text>
        </Box>
        <Box flexDirection="row">
          <IconButton icon="edit" />
          <Box marginLeft="s" />
          <IconButton icon="settings" onPress={() => navigation.openDrawer()} />
        </Box>
      </View>
      <Box paddingHorizontal="m" paddingVertical="s">
        <TextInput
          placeholderTextColor="#8E8E93"
          style={{
            backgroundColor: theme.colors.secondaryBackground,
            borderRadius: 10,
            fontSize: 17,
            padding: theme.spacing.s,
            fontFamily: "SFProTextRegular",
            color: "#8E8E93",
          }}
          placeholder="Search"
        />
      </Box>
    </View>
  );
};
