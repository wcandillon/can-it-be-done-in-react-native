// @flow
import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import { type Video } from './videos';

type VideoModalProps = {
  video: Video,
};

export default class VideoModal extends React.PureComponent<VideoModalProps> {
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: 'red' }} />
    );
  }
}
