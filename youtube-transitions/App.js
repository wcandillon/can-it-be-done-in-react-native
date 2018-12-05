// @flow
/* eslint-disable global-require */
import moment from 'moment';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading, Assets } from 'expo';

type AppState = {
  ready: boolean,
};

const videos = [
  {
    id: '1',
    thumbnail: require('./assets/thumbnails/1.jpg'),
    video: require('./assets/video.mp4'),
    title: 'React Native Image Picker Tutorial',
    username: 'Expo',
    avatar: require('./assets/avatars/1.png'),
    views: 63,
    published: moment().subtract(10, 'days'),
  },
  {
    id: '2',
    thumbnail: require('./assets/thumbnails/2.jpg'),
    video: require('./assets/video.mp4'),
    title: 'PIXI.js in React Native for beginners',
    username: 'Expo',
    avatar: require('./assets/avatars/1.png'),
    views: 216,
    published: moment().subtract(17, 'days'),
  },
  {
    id: '3',
    thumbnail: require('./assets/thumbnails/3.jpg'),
    video: require('./assets/video.mp4'),
    title: 'Sending Firebase Data Messages to Expo: iOS',
    username: 'Expo',
    avatar: require('./assets/avatars/1.png'),
    views: 189,
    published: moment().subtract(24, 'days'),
  },
  {
    id: '3',
    thumbnail: require('./assets/thumbnails/4.jpg'),
    video: require('./assets/video.mp4'),
    title: 'Permissions in React Native for absolute beginners',
    username: 'Expo',
    avatar: require('./assets/avatars/1.png'),
    views: 273,
    published: moment().subtract(31, 'days'),
  },
];

export default class App extends React.PureComponent<{}, AppState> {
  state = {
    ready: false,
  };

  async componentDidMount() {
    await Promise.all(
      videos.map(video => Promise.all([
        Assets.loadAsync(video.video),
        Assets.loadAsync(video.avatar),
        Assets.loadAsync(video.thumbnail),
      ])),
    );
    this.setState({ ready: true });
  }

  render() {
    const { ready } = this.state;
    if (!ready) {
      return (
        <AppLoading />
      );
    }
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
