import * as React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import { Routes } from "../Routes";
import { StyleGuide } from "../components";

const examples = [
  {
    screen: "Duolingo",
    title: "🦉 Duolingo",
  },
  {
    screen: "Rainbow",
    title: "🌈 Rainbow",
  },
  {
    screen: "Snapchat",
    title: "👻 Snapchat",
  },
  {
    screen: "PhilzCoffee",
    title: "☕️ Philz Coffee",
  },
  {
    screen: "Chrome",
    title: "🧭 Google Chrome",
  },
  {
    screen: "Chanel",
    title: "👗 Chanel",
  },
  {
    screen: "ColorSelection",
    title: "🎨 Color Selection",
  },
  {
    screen: "Reflectly",
    title: "🤖 Reflectly",
  },
  {
    screen: "Chess",
    title: "♟ Chess",
  },
  {
    screen: "Bedtime",
    title: "⏰ Bedtime",
  },
  {
    screen: "Darkroom",
    title: "🏞 Darkroom",
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

const Examples = () => {
  const { navigate } = useNavigation<StackNavigationProp<Routes, "Examples">>();
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

export default Examples;
