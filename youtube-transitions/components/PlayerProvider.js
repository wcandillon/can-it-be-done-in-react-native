// @flow
import * as React from 'react';
import {
  View, StyleSheet, Dimensions, StatusBar, Platform,
} from 'react-native';
import { DangerZone } from 'expo';

import PlayerContext from './PlayerContext';
import VideoModal from './VideoModal';
import { type Video } from './videos';

const { height } = Dimensions.get('window');
const { Animated, Easing } = DangerZone;
const { Value, timing } = Animated;
const isOS = Platform.OS === 'ios';

type PlayerProviderProps = {
  children: React.Node,
};

type PlayerProviderState = {
  video: Video | null,
};

export default class PlayerProvider extends React.PureComponent<PlayerProviderProps, PlayerProviderState> {
  state = {
    video: null,
  };

  animation = new Value(0);

  setVideo = (video: Video | null) => {
    this.setState({ video }, this.toggleVideo);
  };

  toggleVideo = () => {
    const { video } = this.state;
    timing(
      this.animation,
      {
        toValue: video ? 1 : 0,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      },
    ).start();
  };

  render() {
    const { setVideo, animation } = this;
    const { children } = this.props;
    const { video } = this.state;
    const translateY = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [height, 0],
    });
    return (
      <PlayerContext.Provider value={{ video, setVideo }}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.container}>
          <View style={StyleSheet.absoluteFill}>
            {children}
          </View>
          {
            isOS && (
              <Animated.View
                style={{ transform: [{ translateY }] }}
              >
                {
                  video && <VideoModal {...{ video }} />
                }
              </Animated.View>
            )
          }
          {
            !isOS && video && <VideoModal {...{ video }} />
          }
        </View>
      </PlayerContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
