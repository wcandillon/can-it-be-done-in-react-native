import * as React from "react";
import { View, Image, StyleSheet } from "react-native";

interface BackgroundImageProps {
  top: string;
  bottom: string;
}

export default class BackgroundImage extends React.PureComponent<BackgroundImageProps> {
  render() {
    const { top, bottom } = this.props;
    return (
      <View style={StyleSheet.absoluteFill}>
        <View style={styles.container}>
          <Image source={{ uri: top }} style={styles.image} />
        </View>
        <View style={styles.container}>
          <Image source={{ uri: bottom }} style={styles.image} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    resizeMode: "cover",
  },
});
