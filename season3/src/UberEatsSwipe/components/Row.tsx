import React from "react";
import { Text, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

interface RowProps {
  label: string;
  icon: string;
  first?: boolean;
}

const Row = ({ label, icon, first }: RowProps) => {
  return (
    <View>
      <Icon name={icon} />
      <Text>{label}</Text>
    </View>
  );
};

export default Row;
