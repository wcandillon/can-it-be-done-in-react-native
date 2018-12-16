// @flow
import * as React from 'react';
import {
  View, SafeAreaView, StyleSheet, Dimensions,
} from 'react-native';
import { Video } from 'expo';

import { type Video as VideoModel } from './videos';
import VideoContent from './VideoContent';

type VideoModalProps = {
  video: VideoModel,
};

const { width } = Dimensions.get('window');
const height = width / 1.78;

export default class VideoModal extends React.PureComponent<VideoModalProps> {
  render() {
    const { video } = this.props;
    return (
      <SafeAreaView style={styles.root}>
        <View style={styles.container}>
          <Video
            source={video.video}
            style={{ width, height }}
            resizeMode={Video.RESIZE_MODE_CONTAIN}
            shouldPlay
          />
          <VideoContent {...{ video }} />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
