// @flow
import * as React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Constants } from 'expo';

import VideoThumbnail from './VideoThumbnail';
import videos from './videos';

type HomeProps = {};

// eslint-disable-next-line react/prefer-stateless-function
export default class Home extends React.PureComponent<HomeProps> {
  render() {
    return (
      <ScrollView style={styles.container}>
        {
          videos.map(video => (
            <VideoThumbnail key={video.id} {...{ video }} />
          ))
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
  },
});
