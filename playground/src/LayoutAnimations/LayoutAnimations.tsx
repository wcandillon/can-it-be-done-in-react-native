import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

import type { Recipes } from "./Recipe";
import { Recipe } from "./Recipe";
import defaultRecipes from "./recipes.json";

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
