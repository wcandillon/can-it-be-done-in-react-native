// @flow
import * as React from "react";
import {
  View, Image, StyleSheet, Dimensions,
} from "react-native";

import type { Story } from "./Story";

const margin = 16;
const borderRadius = 5;
const width = Dimensions.get("window").width / 2 - margin * 2;

type StoryThumbnailProps = {
  story: Story,
};

export default class StoryThumbnail extends React.PureComponent<StoryThumbnailProps> {
  render() {
    const { story } = this.props;
    return (
      <View style={styles.container}>
        <Image source={story.source} style={styles.image} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width,
    height: width * 1.77,
    marginTop: 16,
    borderRadius,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
    resizeMode: "cover",
    borderRadius,
  },
});
