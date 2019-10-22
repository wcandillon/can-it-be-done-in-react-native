import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";

interface Tab {
  id: number;
  name: string;
  thumbnail: number;
}

export const TAB_COLUMNS = 2;
export const TAB_SIZE = Dimensions.get("window").width / TAB_COLUMNS;
export const tabs: Tab[] = [
  {
    id: 1,
    name: "React Native",
    thumbnail: require("./thumbnails/react-native.png")
  },
  {
    id: 2,
    name: "Expo",
    thumbnail: require("./thumbnails/expo.io.png")
  },
  {
    id: 3,
    name: "Apple",
    thumbnail: require("./thumbnails/www.apple.com.png")
  },
  {
    id: 4,
    name: "Start React Native",
    thumbnail: require("./thumbnails/start-react-native.dev.png")
  },
  {
    id: 5,
    name: "Google",
    thumbnail: require("./thumbnails/www.google.com.png")
  }
];
const styles = StyleSheet.create({
  container: { width: TAB_SIZE, height: TAB_SIZE },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderRadius: 16,
    margin: 16
  }
});

export interface TabProps {
  tab: Tab;
}

export default ({ tab: { thumbnail } }: TabProps) => {
  return (
    <View style={styles.container}>
      <Image source={thumbnail} style={styles.image} />
    </View>
  );
};
