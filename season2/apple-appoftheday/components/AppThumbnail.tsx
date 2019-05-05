import * as React from "react";
import {
  View, StyleSheet, Image, Dimensions, Text,
} from "react-native";
import { App } from "./Model";

const { width, height } = Dimensions.get("window");

interface AppThumbnailProps {
  app: App;
}

export default ({ app: { source, title, subtitle } }: AppThumbnailProps) => (
  <View style={styles.container}>
    <Image style={styles.image} {...{ source }} />
    <View style={styles.content}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    width: width - 32,
    height: height / 2,
    alignSelf: "center",
    borderRadius: 8,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  content: {
    ...StyleSheet.absoluteFillObject,
    padding: 16,
    justifyContent: "space-between",
  },
  title: {
    color: "white",
    fontSize: 34,
    lineHeight: 41,
    fontWeight: "bold",
  },
  subtitle: {
    color: "white",
    fontSize: 18,
  },
  image: {
    borderRadius: 8,
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});
