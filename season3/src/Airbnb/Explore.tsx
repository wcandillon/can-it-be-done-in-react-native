import React, { useState } from "react";
import {
  Button,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from "react-native";
import { SharedElement } from "react-navigation-shared-element";
import { useNavigation } from "react-navigation-hooks";

import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "./components";

const { width } = Dimensions.get("window");
const listings = [
  {
    id: "tiny-home",
    title: "Tiny Home",
    subtitle: "Entire Flat · 1 Bed",
    picture: require("./assets/tiny-home.jpg"),
    rating: 4.93,
    ratingCount: 861
  },
  {
    id: "cook-house",
    title: "Cook House",
    subtitle: "Entire Flat · 1 Bed",
    picture: require("./assets/cook-house.jpg"),
    rating: 4.93,
    ratingCount: 861
  }
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center"
  },
  listing: {
    marginBottom: 16
  },
  image: {
    height: 150,
    width: width - 32,
    marginVertical: 8
  },
  title: {
    fontFamily: "CerealMedium",
    fontSize: 18
  }
});

const Explore = () => {
  const { navigate, isFocused } = useNavigation();
  // const opacity = isFocused() ? 1 : 0;
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {listings.map(listing => (
        <View key={listing.id} style={styles.listing}>
          <TouchableWithoutFeedback
            onPress={() => navigate("Listing", { listing })}
          >
            <View>
              <SharedElement id={listing.id}>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={listing.picture}
                />
              </SharedElement>
              <Text style={styles.title}>{listing.title}</Text>
              <Text style={styles.title}>{listing.subtitle}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      ))}
    </SafeAreaView>
  );
};

Explore.sharedElements = () => listings.map(({ id }) => id);

export default Explore;
