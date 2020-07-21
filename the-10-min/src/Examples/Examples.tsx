import * as React from "react";
import { ScrollView, StyleSheet } from "react-native";
import {
  NavigationScreenConfigProps,
  NavigationScreenProp,
} from "react-navigation";

import { StyleGuide, Thumbnail } from "../components";

export const examples = [
  {
    screen: "Slider",
    title: "Custom Slider",
    source: require("../../assets/examples/slider.png"),
  },
  {
    screen: "AngularGradient",
    title: "Angular Gradient",
    source: require("../../assets/examples/angular-gradient.png"),
  },
  {
    screen: "Accordion",
    title: "Accordion",
    source: require("../../assets/examples/accordion.png"),
  },
  {
    screen: "ShaderAndMask",
    title: "OpenGL Shader & Mask",
    source: require("../../assets/examples/shader.png"),
  },
  {
    screen: "CircularProgress",
    title: "Circular Progress",
    source: require("../../assets/examples/circular-progress.png"),
  },
  {
    screen: "Tabbar",
    title: "Tabbar",
    source: require("../../assets/examples/accordion.png"),
  },
  {
    screen: "Menu",
    title: "3D Menu",
    source: require("../../assets/examples/3d.png"),
  },
  {
    screen: "TapGesture",
    title: "Tap Gesture",
    source: require("../../assets/examples/3d.png"),
  },
  {
    screen: "PinchGesture",
    title: "Pinch Gesture",
    source: require("../../assets/examples/pinch-gesture.png"),
  },
  {
    screen: "RotationGesture",
    title: "Rotation Gesture",
    source: require("../../assets/examples/pinch-gesture.png"),
  },
  {
    screen: "Skew",
    title: "Skew Transform",
    source: require("../../assets/examples/shader.png"),
  },
  {
    screen: "Transformation3D",
    title: "3D Transformations",
    source: require("../../assets/examples/3d.png"),
  },
  {
    screen: "Ripple",
    title: "Ripple Effect",
    source: require("../../assets/examples/accordion.png"),
  },
  {
    screen: "Trigonometry",
    title: "Trigonometry",
    source: require("../../assets/examples/circular-progress.png"),
  },
  {
    screen: "Wallet",
    title: "Wallet",
    source: require("../../assets/examples/accordion.png"),
  },
  {
    screen: "Picker",
    title: "Picker",
    source: require("../../assets/examples/accordion.png"),
  },
];

const styles = StyleSheet.create({
  container: {
    backgroundColor: StyleGuide.palette.background,
  },
  content: {
    paddingBottom: 32,
  },
});

export default ({
  navigation,
}: NavigationScreenConfigProps<NavigationScreenProp<{}>>) => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {examples.map((thumbnail) => (
        <Thumbnail
          key={thumbnail.screen}
          onPress={() => navigation.navigate(thumbnail.screen)}
          {...thumbnail}
        />
      ))}
    </ScrollView>
  );
};
