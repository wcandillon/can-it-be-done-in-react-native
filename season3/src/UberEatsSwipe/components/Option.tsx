import React from "react";
import { Text, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

interface OptionProps {
  icon: string;
  label: string;
}

const Option = ({ icon, label }: OptionProps) => {
  return (
    <View>
      <Icon name={icon} />
      <Text>{label}</Text>
    </View>
  );
};

export default Option;
