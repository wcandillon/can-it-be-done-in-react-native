// @flow
import * as React from "react";
import {
  Image, StyleSheet, View, Text,
} from "react-native";

import type { Profile } from "./Profile";

type CardProps = {
  profile: Profile,
};

export default class Card extends React.PureComponent<CardProps> {
  render() {
    const { profile } = this.props;
    return (
      <View style={StyleSheet.absoluteFill}>
        <Image style={styles.image} source={profile.profile} />
        <View style={styles.overlay}>
          <View style={styles.header}>
            <View style={styles.like}>
              <Text style={styles.likeLabel}>LIKE</Text>
            </View>
            <View style={styles.nope}>
              <Text style={styles.nopeLabel}>NOPE</Text>
            </View>
          </View>
          <View style={styles.footer}>
            <Text style={styles.name}>{profile.name}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
    borderRadius: 8,
  },
  overlay: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  footer: {
    flexDirection: "row",
  },
  name: {
    color: "white",
    fontSize: 32,
  },
  like: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: "#6ee3b4",
  },
  likeLabel: {
    fontSize: 32,
    color: "#6ee3b4",
    fontWeight: "bold",

  },
  nope: {
    borderWidth: 4,
    borderRadius: 5,
    padding: 8,
    borderColor: "#ec5288",
  },
  nopeLabel: {
    fontSize: 32,
    color: "#ec5288",
    fontWeight: "bold",
  },
});
