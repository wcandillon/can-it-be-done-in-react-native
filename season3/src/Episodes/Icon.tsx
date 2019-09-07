import React from "react";
import { Dimensions, Image, StyleSheet, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "react-navigation-hooks";

import { StyleGuide } from "../components";

const { width } = Dimensions.get("window");
const size = (width - StyleGuide.spacing * 2 * 5) / 4;
const borderRadius = size * 0.16;
const styles = StyleSheet.create({
  container: {
    width: size,
    borderRadius
  },
  icon: {
    width: size,
    height: size,
    borderRadius
  },
  name: {
    marginTop: StyleGuide.spacing / 2,
    textAlign: "center"
  }
});

interface IconProps {
  id: string;
  name: string;
  icon: number;
}

export default ({ id, name, icon }: IconProps) => {
  const navigation = useNavigation();
  return (
    <RectButton
      onPress={() => navigation.navigate(id)}
      style={styles.container}
    >
      <Image source={icon} style={styles.icon} />
      <Text style={styles.name}>{name}</Text>
    </RectButton>
  );
};
