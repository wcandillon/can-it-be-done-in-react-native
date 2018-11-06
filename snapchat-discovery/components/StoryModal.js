// @flow
import * as React from "react";
import { View, Image, StyleSheet } from "react-native";

import type { Story } from "./Story";

type StoryModalProps = {
  story: Story,
};

export default class StoryModal extends React.PureComponent<StoryModalProps> {
  render() {
    const { story } = this.props;
    return (
      <Image source={story.source} style={styles.image} />
    );
  }
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
});
