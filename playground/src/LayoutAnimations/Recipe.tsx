import React from "react";
import { View, StyleSheet, Dimensions, Image, Pressable } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import Animated, { Layout } from "react-native-reanimated";

const { width } = Dimensions.get("window");
const SIZE = width / 2;

interface Picture {
  preview: string;
  uri: string;
}

interface RecipeModel {
  id: string;
  title: string;
  picture: Picture;
}

export type Recipes = RecipeModel[];

interface RecipeProps {
  recipe: RecipeModel;
  onPress: () => void;
}

export const Recipe = ({ recipe, onPress }: RecipeProps) => {
  return (
    <Animated.View layout={Layout.springify()} style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: recipe.picture.uri }} style={styles.image} />
        <Pressable onPress={onPress}>
          <Icon name="x" color="white" size={24} />
        </Pressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    padding: 8,
  },
  card: {
    flex: 1,
    padding: 8,
    alignItems: "flex-end",
  },
  image: {
    borderRadius: 8,
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});
