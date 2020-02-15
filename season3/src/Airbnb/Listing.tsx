import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "react-navigation-hooks";

import { Description } from "./components";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const Listing = () => {
  const { navigate } = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <SharedElement id="thumbnail">
          <Image
            style={{ height: width, width }}
            source={require("./assets/tiny-home.jpg")}
          />
        </SharedElement>
      </View>
      <Description />
    </View>
  );
};

Listing.sharedElements = () => ["thumbnail"];

export default Listing;
