// @flow
import * as React from 'react';
import {
  View, StyleSheet, Dimensions, StatusBar,
} from 'react-native';
import {
  Video, Constants, DangerZone, GestureHandler,
} from 'expo';

import { type Video as VideoModel } from './videos';
import VideoContent from './VideoContent';

const { Animated } = DangerZone;
const { State, PanGestureHandler } = GestureHandler;
const { width } = Dimensions.get('window');
const height = width / 1.78;
const {
  Extrapolate,
  Value,
  Clock,
  cond,
  eq,
  set,
  block,
  clockRunning,
  startClock,
  spring,
  stopClock,
  event,
  and,
  lessOrEq,
  greaterThan,
  call,
  interpolate,
} = Animated;

type VideoModalProps = {
  video: VideoModel,
};

export default class VideoModal extends React.PureComponent<VideoModalProps> {
  translationY = new Value(0);

  velocityY = new Value(0);

  onGestureEvent: $Call<event>;

  constructor(props: VideoModalProps) {
    super(props);
    const { translationY, velocityY } = this;
    this.onGestureEvent = event(
      [
        {
          nativeEvent: {
            translationY,
            velocityY,
            state: this.state,
          },
        },
      ],
      { useNativeDriver: true },
    );
  }

  render() {
    const { onGestureEvent, translationY } = this;
    const { video } = this.props;
    const { statusBarHeight } = Constants;
    const translateY = translationY.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolateLeft: Extrapolate.CLAMP,
    });
    const statusBarOpacity = translationY.interpolate({
      inputRange: [0, statusBarHeight],
      outputRange: [1, 0],
      extrapolateLeft: Extrapolate.CLAMP,
    });
    return (
      <>
        <Animated.View
          style={{
            height: statusBarHeight,
            backgroundColor: 'black',
            opacity: statusBarOpacity,
          }}
        />
        <PanGestureHandler
          onHandlerStateChange={onGestureEvent}
          activeOffsetY={10}
          {...{ onGestureEvent }}
        >
          <Animated.View style={{ flex: 1, backgroundColor: 'white', transform: [{ translateY }] }}>
            <Video
              source={video.video}
              style={{ width, height }}
              resizeMode={Video.RESIZE_MODE_CONTAIN}
              shouldPlay
            />
            <VideoContent {...{ video }} />
          </Animated.View>
        </PanGestureHandler>
      </>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    height: Constants.statusBarHeight,
    backgroundColor: 'black',
  },
});
