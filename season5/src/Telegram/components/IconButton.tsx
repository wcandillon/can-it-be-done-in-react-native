import type { ComponentProps } from "react";
import React from "react";
import Feather from "@expo/vector-icons/Feather";
import { TouchableNativeFeedback } from "react-native";

import { Box, useTheme } from "../../components";

interface IconButtonProps {
  icon: ComponentProps<typeof Feather>["name"];
  onPress?: () => void;
}

export const IconButton = ({ icon, onPress }: IconButtonProps) => {
  const theme = useTheme();
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <Box
        justifyContent="center"
        alignItems="center"
        backgroundColor="secondaryBackground"
        borderRadius={20}
        width={40}
        height={40}
      >
        <Feather name={icon} size={18} color={theme.colors.mainForeground} />
      </Box>
    </TouchableNativeFeedback>
  );
};
