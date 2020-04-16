import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

import AngularGradient from "../../components/AngularGradient";
import { StyleGuide } from "../../components";

const SIZE = 56;
const MARGIN = 2;
const styles = StyleSheet.create({
  container: {
    width: 75,
    paddingVertical: 8,
    alignItems: "center",
    marginLeft: 8,
  },
  label: {
    marginTop: 8,
  },
  avatar: {
    position: "absolute",
    top: MARGIN,
    left: MARGIN,
    width: SIZE - MARGIN * 2,
    height: SIZE - MARGIN * 2,
    borderRadius: (SIZE - MARGIN) / 2,
    backgroundColor: "white",
  },
  margin: {
    position: "absolute",
    top: MARGIN,
    left: MARGIN,
    width: SIZE - MARGIN * 2,
    height: SIZE - MARGIN * 2,
    borderRadius: (SIZE - MARGIN) / 2,
    borderWidth: MARGIN,
    borderColor: "white",
  },
  add: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: StyleGuide.palette.primary,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "white",
    borderWidth: MARGIN,
  },
});

interface StoryProps {
  label: string;
  picture: string;
  add?: boolean;
}

export default ({ label, picture, add }: StoryProps) => {
  return (
    <View style={styles.container}>
      <View>
        <AngularGradient size={SIZE} colors={["#DA0569", "#4E58CF"]} />
        <View style={styles.avatar} />
        <Image source={{ uri: picture }} style={styles.avatar} />
        <View style={styles.margin} />
        {add && (
          <View style={styles.add}>
            <Icon name="plus" size={16} color="white" />
          </View>
        )}
      </View>
      <Text numberOfLines={1} style={styles.label}>
        {label}
      </Text>
    </View>
  );
};
