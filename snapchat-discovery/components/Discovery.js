// @flow
import * as React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";

import type { Story } from "./Story";
import StoryThumbnail from "./StoryThumbnail";

type DiscoveryProps = {
  stories: Story[];
};

export default class Discovery extends React.PureComponent<DiscoveryProps> {
  render() {
    const { stories } = this.props;
    return (
      <ScrollView style={styles.root} contentInsetAdjustmentBehavior="automatic">
        <SafeAreaView style={styles.container}>
          {
            stories.map(story => <StoryThumbnail key={story.id} {...{ story }} />)
          }
        </SafeAreaView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});
