import * as React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import { StyleGuide } from "../components";
import { Examples as ExamplesRoutes } from "../Routes";
const examples = [
  {
    screen: "Logo",
    title: "⚛️ Logo",
  },
  {
    screen: "Donut",
    title: "🍩 Donut",
  },
  {
    screen: "Cube",
    title: "🧊 Cube",
  },
  {
    screen: "Cone",
    title: "📐 Cone",
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
  const { navigate } = useNavigation<
    StackNavigationProp<ExamplesRoutes, "Examples">
  >();
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
