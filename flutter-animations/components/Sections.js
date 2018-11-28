// @flow
import * as React from 'react';
import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import Headers, { SMALL_HEADER_SIZE, MEDIUM_HEADER_SIZE } from './Headers';
import Content from './Content';
import HorizontalScroll from './HorizontalScroll';

const { height, width } = Dimensions.get('window');
const {
  Clock, event, Value, floor, add, cond, set, eq, sub, multiply, divide,
  interpolate, greaterThan, abs, lessThan, clockRunning, spring, startClock,
  stopClock, or, block, call,
} = Animated;

function runSpring(clock: Clock, value: Value, velocity: Value, dest: Value): Value {
  const state = {
    finished: new Value(0),
    velocity: new Value(0),
    position: new Value(0),
    time: new Value(0),
  };

  const config = {
    damping: 20,
    mass: 1,
    stiffness: 121.6,
    overshootClamping: false,
    restSpeedThreshold: 1,
    restDisplacementThreshold: 0.5,
    toValue: new Value(0),
  };

  return [
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.velocity, velocity),
      set(state.position, value),
      set(config.toValue, dest),
      startClock(clock),
    ]),
    spring(clock, state, config),
    cond(state.finished, stopClock(clock)),
    state.position,
  ];
}

const bound = (offset: Value, lowerBound: Value, higherBound: Value): Value => cond(
  lessThan(offset, lowerBound),
  lowerBound,
  cond(greaterThan(offset, higherBound), 0, offset),
);

const ifCloserToLeft = (v: Value, lowerBound: number, upperBound: number): Value => lessThan(
  abs(sub(v, lowerBound)), abs(sub(v, upperBound)),
);

const snapY = (clock: Clock, offset: Value, velocity: Value): Value => {
  const translation = add(height, add(offset, multiply(0.2, velocity)));
  const snapPoint = cond(
    ifCloserToLeft(translation, SMALL_HEADER_SIZE, MEDIUM_HEADER_SIZE),
    -height + SMALL_HEADER_SIZE,
    cond(ifCloserToLeft(translation, MEDIUM_HEADER_SIZE, height), -height + MEDIUM_HEADER_SIZE, 0),
  );
  return cond(
    eq(offset, snapPoint),
    offset,
    runSpring(clock, offset, velocity, snapPoint),
  );
};

const snapX = (clock: Clock, offset: Value, velocity: Value): Value => {
  const translation = abs(add(offset, multiply(0.2, velocity)));
  const index = floor(divide(translation, width));
  const previous = multiply(width, index);
  const next = multiply(width, add(index, 1));
  const snapPoint = cond(
    ifCloserToLeft(translation, previous, next),
    multiply(previous, -1),
    multiply(next, -1),
  );
  return cond(
    eq(offset, snapPoint),
    offset,
    runSpring(clock, offset, velocity, snapPoint),
  );
};

const scroll = (
  gestureState: Value, offset: Value, translation: Value, prevTranslation: Value,
  velocity: Value, lowerBound: Value, higherBound: Value, clock: Clock, snap: (Value, Value) => Value,
): Value => cond(
  eq(gestureState, State.ACTIVE),
  [
    set(offset, add(offset, sub(translation, prevTranslation))),
    set(prevTranslation, translation),
    offset,
  ],
  [
    cond(eq(gestureState, State.BEGAN), [stopClock(clock)]),
    set(prevTranslation, 0),
    set(offset, bound(offset, lowerBound, higherBound)),
    cond(eq(gestureState, State.END), set(offset, snap(clock, offset, velocity))),
    offset,
  ],
);

type SectionsProps = {
  sections: Section[],
};

export default class Sections extends React.PureComponent<SectionsProps> {
  constructor(props: SectionsProps) {
    super(props);
    this.clockX = new Clock();
    this.clockY = new Clock();
    this.translationY = new Value(0);
    this.translationX = new Value(0);
    this.prevTranslationY = new Value(0);
    this.prevTranslationX = new Value(0);
    this.offsetX = new Value(0);
    this.offsetY = new Value(0);
    this.velocityX = new Value(0);
    this.velocityY = new Value(0);
    this.gestureState = new Value(State.UNDETERMINED);
    this.onGestureEvent = event(
      [
        {
          nativeEvent: {
            translationY: this.translationY,
            translationX: this.translationX,
            velocityX: this.velocityX,
            velocityY: this.velocityY,
            state: this.gestureState,
          },
        },
      ],
      { useNativeDriver: true },
    );
  }

  render() {
    const {
      onGestureEvent, translationX, translationY, offsetX, offsetY, prevTranslationX, prevTranslationY, gestureState,
      velocityX, velocityY, clockX, clockY,
    } = this;
    const { sections } = this.props;
    const lowerBoundX = -width * (sections.length - 1);
    const higherBoundX = 0;
    const lowerBoundY = -width * 2;
    const higherBoundY = 0;
    const x = scroll(gestureState, offsetX, translationX, prevTranslationX, velocityX, lowerBoundX, higherBoundX, clockX, snapX);
    const y = scroll(gestureState, offsetY, translationY, prevTranslationY, velocityY, lowerBoundY, higherBoundY, clockY, snapY);
    return (
      <PanGestureHandler
        onHandlerStateChange={onGestureEvent}
        {...{ onGestureEvent }}
      >
        <Animated.View style={{ flex: 1 }}>
          <HorizontalScroll numberOfSections={sections.length} {...{ x, y }}>
            <Headers {...{ sections, y }} />
            <Content {...{ sections, y }} />
          </HorizontalScroll>
        </Animated.View>
      </PanGestureHandler>

    );
  }
}
