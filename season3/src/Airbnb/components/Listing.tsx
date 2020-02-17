import React from "react";
import { Dimensions, Image, StyleSheet, Text, View } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { useNavigation } from "react-navigation-hooks";
import { SharedElement } from "react-navigation-shared-element";
import { FontAwesome as Icon } from "@expo/vector-icons";

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
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
  },
  details: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },
  rating: {
    flexDirection: "row",
    alignItems: "center"
  },
  superhost: {
    borderColor: "black",
    borderRadius: 30,
    borderWidth: 1,
    padding: 4
  },
  superhostLabel: {
    fontSize: 10,
    fontFamily: "CerealMedium"
  }
});

export interface Listing {
  id: string;
  title: string;
  subtitle: string;
  picture: number;
  rating: number;
  ratingCount: number;
}

interface ListingProps {
  listing: Listing;
}

export default ({ listing }: ListingProps) => {
  const { navigate } = useNavigation();
  return (
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
          <View style={styles.details}>
            <View style={styles.superhost}>
              <Text style={styles.superhostLabel}>SUPERHOST</Text>
            </View>
            <View style={styles.rating}>
              <Icon name="star" color="rgb(255, 56, 92)" />
              <Text>{`${listing.rating} (${listing.ratingCount})`}</Text>
            </View>
          </View>
          <Text style={styles.title}>{listing.title}</Text>
          <Text style={styles.title}>{listing.subtitle}</Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};
