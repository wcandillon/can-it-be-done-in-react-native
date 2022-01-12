import * as React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import type { Routes } from "../Routes";
import { StyleGuide } from "../components/StyleGuide";

const examples = [
  {
    screen: "RotaryLogin",
    title: "☎️ Rotary Login",
  },
  {
    screen: "Tarot",
    title: "🧙‍♂️ Tarot",
  },
  {
    screen: "Pinch",
    title: "🔎 Pinch to Zoom",
  },
  {
    screen: "LayoutAnimations",
    title: "🔃 Layout Animations",
  },
  {
    screen: "WebGL",
    title: "🟢 WebGL",
  },
] as const;

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.background,
  },
  content: {
    paddingBottom: 32,
  },
  thumbnail: {
    backgroundColor: "white",
    padding: StyleGuide.spacing * 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: StyleGuide.palette.background,
  },
  title: {
    ...StyleGuide.typography.headline,
  },
});

export const Examples = () => {
  const { navigate } =
    useNavigation<StackNavigationProp<Routes, "Playground">>();
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {examples.map((thumbnail) => (
        <RectButton
          key={thumbnail.screen}
          onPress={() => navigate(thumbnail.screen)}
        >
          <View style={styles.thumbnail}>
            <Text style={styles.title}>{thumbnail.title}</Text>
          </View>
        </RectButton>
      ))}
    </ScrollView>
  );
};
