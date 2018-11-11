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
            <View>
              <Text>LIKE</Text>
            </View>
            <View>
              <Text>NOPE</Text>
            </View>
          </View>
          <View style={styles.footer}>
            <Text>{profile.name}</Text>
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
  },
  footer: {
    flexDirection: "row",
  },
});
