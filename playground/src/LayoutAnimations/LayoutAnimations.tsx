import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";

import type { Recipes } from "./Recipe";
import { Recipe } from "./Recipe";

const defaultRecipes: Recipes = [
  {
    id: "hummus",
    title: "Hummus",
    picture: require("./assets/hummus.png"),
  },
  {
    id: "broccoli-slaw",
    title: "Broccoli slaw",
    picture: require("./assets/broccoli-slaw.png"),
  },
  {
    id: "morning-smoothies",
    title: "Morning Smoothies",
    picture: require("./assets/morning-smoothies.png"),
  },
  {
    id: "fruity-oatmeal",
    title: "Fruity Oatmeal",
    picture: require("./assets/fruity-oatmeal.png"),
  },
  {
    id: "belgian-waffels",
    title: "Belgian Waffels",
    picture: require("./assets/belgian-waffels.png"),
  },
  {
    id: "french-toast",
    title: "French toast",
    picture: require("./assets/french-toast.png"),
  },
];

export const assets = defaultRecipes.map(({ picture }) => picture);

export const LayoutAnimations = () => {
  const [recipes, setRecipes] = useState<Recipes>(defaultRecipes);
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {recipes.map((recipe, i) => (
        <Recipe
          recipe={recipe}
          key={recipe.id}
          onPress={() => {
            recipes.splice(i, 1);
            setRecipes([...recipes]);
          }}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});
