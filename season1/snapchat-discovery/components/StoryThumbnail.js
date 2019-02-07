// @flow
import * as React from "react";
import {
  View, Image, StyleSheet, Dimensions, TouchableWithoutFeedback, Platform,
} from "react-native";
import { Constants } from "expo";

import type { Story } from "./Story";

const margin = 16;
const borderRadius = 5;
const width = Dimensions.get("window").width / 2 - margin * 2;
const offset = (v: number) => (Platform.OS === "android" ? (v + Constants.statusBarHeight) : v);

type StoryThumbnailProps = {
  story: Story,
  onPress: () => void,
  selected: boolean,
};

export default class StoryThumbnail extends React.PureComponent<StoryThumbnailProps> {
  ref = React.createRef();

  measure = async (): Position => new Promise(resolve => this.ref.current.measureInWindow((x, y, width, height) => resolve({
    x, y: offset(y), width, height,
  })));

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
