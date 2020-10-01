import { useNavigation } from "@react-navigation/native";
// @flow
import * as React from "react";
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";

const margin = 16;
const borderRadius = 5;
const width = Dimensions.get("window").width / 2 - margin * 2;

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

export interface Story {
  id: string;
  source: number;
  user: string;
  avatar: number;
  video?: number;
}

interface StoryThumbnailProps {
  story: Story;
}

const StoryThumbnail = ({ story }: StoryThumbnailProps) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => navigation.navigate("Story", { story })}
    >
      <View style={styles.container}>
        <Image source={story.source} style={styles.image} />
      </View>
    </TouchableWithoutFeedback>
  );
};

export default StoryThumbnail;
