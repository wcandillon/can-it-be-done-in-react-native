// @flow
import * as React from "react";
import { Image, StyleSheet } from "react-native";

import type { Profile } from "./Profile";

type CardProps = {
  profile: Profile,
};

export default class Card extends React.PureComponent<CardProps> {
  render() {
    const { profile } = this.props;
    return (
      <Image style={styles.image} source={profile.profile} />
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
});
