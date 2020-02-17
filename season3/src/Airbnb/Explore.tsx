import React, { useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "react-navigation-hooks";

import { Header } from "./components";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white"
  }
});

const Explore = () => {
  const { navigate, isFocused } = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={() => navigate("Listing")}>
        <SharedElement id="thumbnail">
          <Image
            style={{
              height: 150,
              width: width - 32,
              opacity: isFocused() ? 1 : 0
            }}
            resizeMode="cover"
            source={require("./assets/tiny-home.jpg")}
          />
        </SharedElement>
      </TouchableWithoutFeedback>
    </View>
  );
};

Explore.sharedElements = () => [{ id: "thumbnail", resize: "auto" }];

export default Explore;
