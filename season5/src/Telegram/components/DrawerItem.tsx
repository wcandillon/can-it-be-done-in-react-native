import type { ComponentProps } from "react";
import React from "react";
import Feather from "@expo/vector-icons/Feather";

import { Box, Text, useTheme } from "../../components";

interface DrawerItemProps {
  label: string;
  icon: ComponentProps<typeof Feather>["name"];
}

export const DrawerItem = ({ label, icon }: DrawerItemProps) => {
  const theme = useTheme();
  return (
    <Box flexDirection="row" padding="m" alignItems="center">
      <Feather
        name={icon}
        size={24}
        style={{ paddingRight: 16, color: theme.colors.mainForeground }}
      />
      <Text variant="item">{label}</Text>
    </Box>
  );
};
