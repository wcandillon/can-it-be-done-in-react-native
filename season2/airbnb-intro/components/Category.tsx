// @flow
import * as React from "react";
import {
  View, Image, StyleSheet, Text, ImageSourcePropType,
} from "react-native";

import StyleGuide from "./StyleGuide";

interface CategoryProps {
    label: string;
    image: ImageSourcePropType
}

export default class Category extends React.PureComponent<CategoryProps> {
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
    width: 121,
    height: 115,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "#b3b3b3",
    marginRight: StyleGuide.spacing.small,
  },
  image: {
    width: 121,
    height: 68,
    borderRadius: 2,
  },
  text: {
    marginTop: StyleGuide.spacing.tiny,
    marginLeft: StyleGuide.spacing.tiny,
  },
});
