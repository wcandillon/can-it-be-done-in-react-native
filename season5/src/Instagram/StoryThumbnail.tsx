import * as React from "react";
import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { SharedElement } from "react-navigation-shared-element";
import { View, Image, StyleSheet, Dimensions, Pressable } from "react-native";

import type { Story, InstagramRoutes } from "./Model";

const margin = 16;
const borderRadius = 5;
const width = Dimensions.get("window").width / 2 - margin * 2;
type Navigation = NavigationProp<InstagramRoutes>;

const styles = StyleSheet.create({
  container: {
    width,
    height: width * 1.77,
    marginTop: 16,
    borderRadius,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
    borderRadius,
  },
});

interface StoryThumbnailProps {
  story: Story;
}

export const StoryThumbnail = ({ story }: StoryThumbnailProps) => {
  const navigation = useNavigation<Navigation>();
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Story", { story });
      }}
    >
      <SharedElement id={story.id}>
        <View style={[styles.container]}>
          <Image source={story.source} style={styles.image} />
        </View>
      </SharedElement>
    </Pressable>
  );
};
