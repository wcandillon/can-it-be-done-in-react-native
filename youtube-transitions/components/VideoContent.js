// @flow
import * as React from 'react';
import {
  View, StyleSheet, Text, Image,
} from 'react-native';

import videos, { type Video } from './videos';

type VideoContentProps = {
  video: Video,
};

export default class VideoContent extends React.PureComponent<VideoContentProps> {
  render() {
    const { video } = this.props;
    const upNextVideos = videos.filter(v => v.id !== video.id);
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{video.title}</Text>
        <Text style={styles.views}>{`${video.views} views`}</Text>
        <View>
          <Text>Up next</Text>
          {
            upNextVideos.map(v => (
              <View key={v.id} style={styles.thumbnail}>
                <Image source={v.thumbnail} style={styles.thumbnailImage} />
                <View style={styles.thumbnailContent}>
                  <Text numberOfLines={2}>{v.title}</Text>
                  <Text>{v.username}</Text>
                </View>
              </View>
            ))
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {

  },
  views: {

  },
  thumbnail: {
    flexDirection: 'row',
    marginTop: 16,
  },
  thumbnailImage: {
    height: 100,
    width: 100,
  },
  thumbnailContent: {
    paddingTop: 8,
    paddingLeft: 8,
    paddingBottom: 8,
    flex: 1,
    flexWrap: 'wrap',
  },
});
