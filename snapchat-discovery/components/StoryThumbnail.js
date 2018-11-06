// @flow
import * as React from "react";
import {
  View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback,
} from "react-native";

import type { Story } from "./Story";

const margin = 16;
const borderRadius = 5;
const width = Dimensions.get("window").width / 2 - margin * 2;

type StoryThumbnailProps = {
  story: Story,
  onPress: () => void,
};

export default class StoryThumbnail extends React.PureComponent<StoryThumbnailProps> {
  render() {
    const { story, onPress } = this.props;
    return (
      <TouchableWithoutFeedback {...{ onPress }}>
        <View style={styles.container}>
          <Image source={story.source} style={styles.image} />
        </View>
      </TouchableWithoutFeedback>
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
