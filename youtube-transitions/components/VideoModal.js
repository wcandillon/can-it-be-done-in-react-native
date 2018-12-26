// @flow
import * as React from 'react';
import { Dimensions } from 'react-native';
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
  add,
  multiply,
  lessThan,
  clockRunning,
  startClock,
  spring,
  stopClock,
  event,
  greaterThan,
  interpolate,
} = Animated;

function runSpring(clock: Clock, value: Value, dest: number): Value {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 20,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 0.5,
    toValue: new Value(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, 0),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}

type VideoModalProps = {
  video: VideoModel,
};

export default class VideoModal extends React.PureComponent<VideoModalProps> {
  translationY = new Value(0);

  velocityY = new Value(0);

  gestureState = new Value(State.UNDETERMINED);

  onGestureEvent: $Call<event>;

  translateY: Value;

  constructor(props: VideoModalProps) {
    super(props);
    const { translationY, velocityY, gestureState: state } = this;
    this.onGestureEvent = event(
      [
        {
          nativeEvent: {
            translationY,
            velocityY,
            state,
          },
        },
      ],
      { useNativeDriver: true },
    );
    const clockY = new Clock();
    const finalTranslateX = add(translationY, multiply(0.2, velocityY));
    const translationThreshold = width / 2;
    const snapPoint = cond(
      lessThan(finalTranslateX, translationThreshold),
      0,
      cond(greaterThan(finalTranslateX, translationThreshold), -height, 0),
    );
    this.translateY = cond(
      eq(state, State.END),
      [
        set(translationY, runSpring(clockY, translationY, snapPoint)),
        translationY,
      ],
      translationY,
    );
  }

  render() {
    const { onGestureEvent, translateY } = this;
    const { video } = this.props;
    const { statusBarHeight } = Constants;
    const tY = interpolate(translateY, {
      inputRange: [0, 1],
      outputRange: [0, 1],
      extrapolateLeft: Extrapolate.CLAMP,
    });
    const statusBarOpacity = interpolate(translateY, {
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
          <Animated.View style={{ flex: 1, backgroundColor: 'white', transform: [{ translateY: tY }] }}>
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
