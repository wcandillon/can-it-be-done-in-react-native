// @flow
import * as React from "react";
import {
  StyleSheet, ScrollView, SafeAreaView, View,
} from "react-native";

import type { Story, Position } from "./Story";
import StoryThumbnail from "./StoryThumbnail";
import StoryModal from "./StoryModal";

type DiscoveryProps = {
  stories: Story[];
};

type DiscoveryState = {
  story: Story | null,
  position: Position | null,
};

export default class Discovery extends React.PureComponent<DiscoveryProps, DiscoveryState> {
  state = {
    story: null,
  };

  thumbnails = {};

  constructor(props: DiscoveryProps) {
    super(props);
    props.stories.forEach((story) => {
      this.thumbnails[story.id] = React.createRef();
    });
  }

  goToStory = async (story: Story) => {
    const position = await this.thumbnails[story.id].current.measure();
    this.setState({ story, position });
  }

  onRequestClose = () => this.setState({ story: null, position: null });

  render() {
    const { onRequestClose } = this;
    const { stories } = this.props;
    const { story, position } = this.state;
    return (
      <View style={styles.flex}>
        <ScrollView style={styles.flex} contentInsetAdjustmentBehavior="automatic">
          <SafeAreaView style={styles.container}>
            {
            stories.map(
              s => (
                <StoryThumbnail
                  ref={this.thumbnails[s.id]}
                  key={s.id}
                  selected={!!story && story.id === s.id}
                  onPress={() => this.goToStory(s)}
                  story={s}
                />
              ),
            )
          }
          </SafeAreaView>
        </ScrollView>
        {
          story !== null && (
            <View style={StyleSheet.absoluteFill}>
              <StoryModal {...{ story, position, onRequestClose }} />
            </View>
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
