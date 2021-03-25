import * as React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import { Routes } from "../Routes";
import { StyleGuide } from "../components";

const examples = [
  {
    screen: "Worklets",
    title: "👩‍🏭 Worklets",
  },
  {
    screen: "PanGesture",
    title: "💳 PanGesture",
  },
  {
    screen: "Transitions",
    title: "🔁 Transitions",
  },
  {
    screen: "Chart",
    title: "📈 Chart",
  },
  {
    screen: "JellyScroll",
    title: "🍩 Jelly Scroll",
  },
  {
    screen: "MaskedView",
    title: "📱 Masked View",
  },
  {
    screen: "Accordion",
    title: "🗺 Accordion",
  },
  {
    screen: "Wave",
    title: "🌊 Wave",
  },
  {
    screen: "Fluid",
    title: "🍸 Fluid",
  },
  {
    screen: "StrokeAnimation",
    title: "🔠 Stroke Animations",
  },
  {
    screen: "ZAnimations",
    title: "⚛️ 3D Animations",
  },
  {
    screen: "StickyShapes",
    title: "🟣 Sticky Shapes",
  },
  {
    screen: "DVDLogo",
    title: "📀 DVD Logo",
  },
  {
    screen: "PizzaChallenge",
    title: "🍕 Pizza",
  },
  {
    screen: "Breathe",
    title: "🧘 Breathe",
  },
  {
    screen: "Nokia",
    title: "📱 Nokia",
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
