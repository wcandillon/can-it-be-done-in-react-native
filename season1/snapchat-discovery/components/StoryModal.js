// @flow
import * as React from "react";
import { Image, StyleSheet, Dimensions } from "react-native";
import { Video } from "expo";
import { PanGestureHandler, State } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import type { Story, Position } from "./Story";

const {
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
const { width: wWidth, height: wHeight } = Dimensions.get("window");

function runSpring(value, dest) {
  const clock = new Clock();
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    toValue: new Value(0),
    damping: 10,
    mass: 1,
    stiffness: 100,
    overshootClamping: false,
    restSpeedThreshold: 0.001,
    restDisplacementThreshold: 0.001,
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.velocity, 0),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    set(value, state.position),
  ]);
}

type StoryModalProps = {
  story: Story,
  position: Position,
  onRequestClose: () => void,
};

export default class StoryModal extends React.PureComponent<StoryModalProps> {
  constructor(props: ModalProps) {
    super(props);
    const { position } = props;
    const {
      x, y, width, height,
    } = position;
    this.clock = new Clock();
    this.state = new Value(State.UNDETERMINED);
    this.close = new Value(1);
    this.velocityY = new Value(0);
    this.translateX = new Value(x);
    this.translateY = new Value(y);
    this.width = new Value(width);
    this.height = new Value(height);

    this.onGestureEvent = event(
      [
        {
          nativeEvent: {
            translationX: this.translateX,
            translationY: this.translateY,
            velocityY: this.velocityY,
            state: this.state,
          },
        },
      ],
      { useNativeDriver: true },
    );
  }

  render() {
    const {
      width, height, translateX, translateY, onGestureEvent,
    } = this;
    const { story, position, onRequestClose } = this.props;
    const style = {
      borderRadius: 5,
      width,
      height,
      transform: [
        { translateX },
        { translateY },
      ],
    };
    return (
      <React.Fragment>
        <Animated.Code>
          {
          () => block(
            [
              cond(eq(this.state, State.UNDETERMINED), runSpring(this.translateX, 0)),
              cond(eq(this.state, State.UNDETERMINED), runSpring(this.translateY, 0)),
              cond(eq(this.state, State.UNDETERMINED), runSpring(this.width, wWidth)),
              cond(eq(this.state, State.UNDETERMINED), runSpring(this.height, wHeight)),
              cond(and(eq(this.state, State.END), lessOrEq(this.velocityY, 0)), [
                runSpring(this.translateX, 0),
                runSpring(this.translateY, 0),
                runSpring(this.width, wWidth),
                runSpring(this.height, wHeight),
              ]),
              cond(and(eq(this.state, State.END), greaterThan(this.velocityY, 0)), [
                runSpring(this.translateX, position.x),
                runSpring(this.translateY, position.y),
                runSpring(this.width, position.width),
                runSpring(this.height, position.height),
                cond(eq(this.height, position.height), call([], onRequestClose)),
              ]),
              cond(eq(this.state, State.ACTIVE), set(this.width, interpolate(this.translateY, {
                inputRange: [wHeight / 4, wHeight - position.height],
                outputRange: [wWidth, position.width],
              }))),
              cond(eq(this.state, State.ACTIVE), set(this.height, interpolate(this.translateY, {
                inputRange: [wHeight / 4, wHeight - position.height],
                outputRange: [wHeight, position.height],
              }))),
            ],
          )
        }
        </Animated.Code>
        <PanGestureHandler
          activeOffsetY={100}
          onHandlerStateChange={onGestureEvent}
          {...{ onGestureEvent }}
        >
          <Animated.View {...{ style }}>
            {
              !story.video && (
                <Image source={story.source} style={styles.image} />
              )
            }
            {
              story.video && (
                <Video
                  source={story.video}
                  rate={1.0}
                  volume={1.0}
                  isMuted={false}
                  resizeMode="cover"
                  shouldPlay
                  isLooping
                  style={styles.video}
                />
              )
            }
          </Animated.View>
        </PanGestureHandler>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
    borderRadius: 5,
  },
  video: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 5,
  },
});
