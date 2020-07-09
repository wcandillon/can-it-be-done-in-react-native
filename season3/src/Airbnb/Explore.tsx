import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Header, Listing } from "./components";
import { Listing as ListingModel } from "./components/Listing";

const listings: ListingModel[] = [
  {
    id: "tiny-home",
    title: "Tiny Home",
    subtitle: "Entire Flat · 1 Bed",
    picture: require("./assets/tiny-home.jpg"),
    rating: 4.93,
    ratingCount: 861,
  },
  {
    id: "cook-house",
    title: "Cook House",
    subtitle: "Entire Flat · 1 Bed",
    picture: require("./assets/cook-house.jpg"),
    rating: 4.93,
    ratingCount: 861,
  },
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },
});

const Explore = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {listings.map((listing) => (
        <Listing key={listing.id} {...{ listing }} />
      ))}
    </SafeAreaView>
  );
};

export default Explore;
