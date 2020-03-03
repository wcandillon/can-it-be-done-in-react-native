import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";

import {
  NavigationScreenConfigProps,
  NavigationScreenProp
} from "react-navigation";
import { StyleGuide, Thumbnail } from "../components";

export const examples = [
  {
    screen: "Slider",
    title: "Custom Slider",
    source: require("../../assets/examples/slider.png")
  },
  {
    screen: "AngularGradient",
    title: "Angular Gradient",
    source: require("../../assets/examples/angular-gradient.png")
  },
  {
    screen: "Accordion",
    title: "Accordion",
    source: require("../../assets/examples/accordion.png")
  },
  {
    screen: "ShaderAndMask",
    title: "OpenGL Shader & Mask",
    source: require("../../assets/examples/shader.png")
  },
  {
    screen: "CircularProgress",
    title: "Circular Progress",
    source: require("../../assets/examples/circular-progress.png")
  }
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.background
  },
  content: {
    paddingBottom: 32
  }
});

export default ({
  navigation
}: NavigationScreenConfigProps<NavigationScreenProp<{}>>) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {examples.map(thumbnail => (
        <Thumbnail
          key={thumbnail.screen}
          onPress={() => navigation.navigate(thumbnail.screen)}
          {...thumbnail}
        />
      ))}
    </ScrollView>
  );
};
