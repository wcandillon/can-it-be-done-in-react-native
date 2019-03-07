// @flow
import * as React from "react";
import {
  View, Image, StyleSheet, ImageSourcePropType, Text,
} from "react-native";

import StyleGuide from "./StyleGuide";

interface CityCardProps {
    label: string;
    image: ImageSourcePropType;
}

export default class CityCard extends React.PureComponent<CityCardProps> {
  render() {
    const { label, image } = this.props;
    return (
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <Text style={styles.text}>{label}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: StyleGuide.spacing.small,
  },
  image: {
    width: 121,
    height: 121 * 1.67,
  },
  text: {
    marginTop: StyleGuide.spacing.tiny,
  },
});
