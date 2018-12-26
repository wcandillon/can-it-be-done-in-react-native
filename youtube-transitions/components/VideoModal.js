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
const { width, height } = Dimensions.get('window');
const {
  Extrapolate,
  Value,
  Clock,
  cond,
  eq,
  set,
  add,
  sub,
  multiply,
  lessThan,
  clockRunning,
  startClock,
  spring,
  stopClock,
  event,
  interpolate,
} = Animated;
const { statusBarHeight } = Constants;
const boundY = height - statusBarHeight - 128;
const minHeight = 64;
const AnimatedVideo = Animated.createAnimatedComponent(Video);

function runSpring(clock: Clock, value: Value, dest: Value): Value {
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

  offsetY = new Value(0);

  gestureState = new Value(State.UNDETERMINED);

  onGestureEvent: $Call<event>;

  translateY: Value;

  constructor(props: VideoModalProps) {
    super(props);
    const {
      translationY, velocityY, offsetY, gestureState: state,
    } = this;
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
    const finalTranslateY = add(add(translationY, offsetY), multiply(0.2, velocityY));
    const snapPoint = cond(
      lessThan(finalTranslateY, sub(offsetY, height / 4)),
      0,
      boundY,
    );
    this.translateY = cond(
      eq(state, State.END),
      [
        set(translationY, runSpring(clockY, add(translationY, offsetY), snapPoint)),
        set(offsetY, translationY),
        translationY,
      ],
      add(offsetY, translationY),
    );
  }

  render() {
    const { onGestureEvent, translateY } = this;
    const { video } = this.props;
    const tY = interpolate(translateY, {
      inputRange: [0, boundY],
      outputRange: [0, boundY],
      extrapolate: Extrapolate.CLAMP,
    });
    const opacity = interpolate(translateY, {
      inputRange: [0, boundY - 100],
      outputRange: [1, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    const statusBarOpacity = interpolate(translateY, {
      inputRange: [0, statusBarHeight],
      outputRange: [1, 0],
      extrapolateLeft: Extrapolate.CLAMP,
    });
    const videoWidth = interpolate(translateY, {
      inputRange: [0, boundY],
      outputRange: [width, width - 16],
      extrapolate: Extrapolate.CLAMP,
    });
    const videoHeight = interpolate(translateY, {
      inputRange: [0, boundY],
      outputRange: [width / 1.78, minHeight],
      extrapolate: Extrapolate.CLAMP,
    });
    const containerHeight = interpolate(translateY, {
      inputRange: [0, boundY],
      outputRange: [height, 0],
      extrapolate: Extrapolate.CLAMP,
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
          activeOffsetY={[-10, 10]}
          {...{ onGestureEvent }}
        >
          <Animated.View
            style={{
              transform: [{ translateY: tY }],
              alignItems: 'center',
            }}
          >
            <AnimatedVideo
              source={video.video}
              style={{ width: videoWidth, height: videoHeight }}
              resizeMode={Video.RESIZE_MODE_COVER}
              shouldPlay
            />
            <Animated.View style={{ backgroundColor: 'white', width, height: containerHeight }}>
              <Animated.View style={{ opacity }}>
                <VideoContent {...{ video }} />
              </Animated.View>
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </>
    );
  }
}
