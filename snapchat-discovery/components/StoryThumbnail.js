// @flow
import * as React from "react";
import {
  View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback,
} from "react-native";

import type { Story } from "./Story";

const margin = 16;
const borderRadius = 5;
const width = Dimensions.get("window").width / 2 - margin * 2;

const measureInWindowAsync = ref => new Promise(resolve => ref.measureInWindow((x, y, width, height) => resolve({
  x, y, width, height,
})));

type StoryThumbnailProps = {
  story: Story,
  onPress: () => void,
  selected: boolean,
};

export default class StoryThumbnail extends React.PureComponent<StoryThumbnailProps> {
  ref = React.createRef();

  measure = async (): Position => measureInWindowAsync(this.ref.current);

  render() {
    const { ref } = this;
    const { story, onPress, selected } = this.props;
    return (
      <TouchableWithoutFeedback {...{ onPress }}>
        <View style={styles.container}>
          {
            !selected && (
            <Image source={story.source} style={styles.image} {...{ ref }} />
            )
          }
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
