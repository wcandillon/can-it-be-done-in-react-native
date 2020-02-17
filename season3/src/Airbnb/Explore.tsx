import React, { useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "react-navigation-hooks";

import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "./components";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  image: {
    height: 150,
    width: width - 32
  }
});

const Explore = () => {
  const { navigate, isFocused } = useNavigation();
  // const opacity = isFocused() ? 1 : 0;
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <TouchableWithoutFeedback onPress={() => navigate("Listing")}>
        <SharedElement id="thumbnail">
          <Image
            style={styles.image}
            resizeMode="cover"
            source={require("./assets/tiny-home.jpg")}
          />
        </SharedElement>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

Explore.sharedElements = () => [{ id: "thumbnail", resize: "auto" }];

export default Explore;
