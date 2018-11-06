// @flow
import * as React from "react";
import {
  StyleSheet, ScrollView, SafeAreaView, View,
} from "react-native";

import type { Story } from "./Story";
import StoryThumbnail from "./StoryThumbnail";
import StoryModal from "./StoryModal";

type DiscoveryProps = {
  stories: Story[];
};

type DiscoveryState = {
  story: Story | null,
};

export default class Discovery extends React.PureComponent<DiscoveryProps, DiscoveryState> {
  state = {
    story: null,
  };

  goToStory = (story: Story) => this.setState({ story });

  render() {
    const { stories } = this.props;
    const { story } = this.state;
    return (
      <View style={styles.flex}>
        <ScrollView style={styles.flex} contentInsetAdjustmentBehavior="automatic">
          <SafeAreaView style={styles.container}>
            {
            stories.map(
              story => <StoryThumbnail key={story.id} onPress={() => this.goToStory(story)} {...{ story }} />,
            )
          }
          </SafeAreaView>
        </ScrollView>
        {
          story !== null && (
            <StoryModal {...{ story }} />
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
});
