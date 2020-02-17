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
  }
});

const Explore = () => {
  const { navigate, isFocused } = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View>
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
      </View>
      <Button title="hello" onPress={() => navigate("Listing")} />
    </SafeAreaView>
  );
};

Explore.sharedElements = () => [{ id: "thumbnail", resize: "auto" }];

export default Explore;
