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
  stopClock, or, block, call, neq, and, lessOrEq,
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

// TODO: use diffClamp instead?
const bound = (offset: Value, lowerBound: Value, upperBound: Value): Value => cond(
  lessThan(offset, lowerBound),
  lowerBound,
  cond(greaterThan(offset, upperBound), 0, offset),
);

const ifCloserToLeft = (v: Value, lowerBound: number, upperBound: number): Value => lessThan(
  abs(sub(v, lowerBound)), abs(sub(v, upperBound)),
);

const snapY = (clock: Clock, offset: Value, velocity: Value, currentIndex: Value): Value => {
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

const snapX = (clock: Clock, offset: Value, velocity: Value, currentIndex: Value): Value => {
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
    [
      cond(eq(clockRunning(clock), 0), [
        set(currentIndex, divide(abs(snapPoint), width)),
      ]),
      runSpring(clock, offset, velocity, snapPoint),
    ],
  );
};

const scroll = (
  gestureState: Value, offset: Value, translation: Value, prevTranslation: Value,
  velocity: Value, lowerBound: Value, upperBound: Value, clock: Clock,
  snap: (Value, Value) => Value, currentIndex: Value,
): Value => cond(
  and(eq(gestureState, State.ACTIVE)),
  [
    set(offset, add(offset, sub(translation, prevTranslation))),
    set(prevTranslation, translation),
    offset,
  ],
  [
    cond(eq(gestureState, State.BEGAN), stopClock(clock)),
    set(prevTranslation, 0),
    set(offset, bound(offset, lowerBound, upperBound)),
    cond(eq(gestureState, State.END), set(offset, snap(clock, offset, velocity, currentIndex))),
    offset,
  ],
);

type SectionsProps = {
  sections: Section[],
};

export default class Sections extends React.PureComponent<SectionsProps> {
  constructor(props: SectionsProps) {
    super(props);
    this.horizontalHandler = React.createRef();
    this.verticalHandler = React.createRef();
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
    this.gestureStateX = new Value(State.UNDETERMINED);
    this.gestureStateY = new Value(State.UNDETERMINED);
    this.currentIndex = new Value(0);
    this.onGestureEventX = event(
      [
        {
          nativeEvent: {
            translationX: this.translationX,
            velocityX: this.velocityX,
            state: this.gestureStateX,
          },
        },
      ],
      { useNativeDriver: true },
    );
    this.onGestureEventY = event(
      [
        {
          nativeEvent: {
            translationY: this.translationY,
            velocityY: this.velocityY,
            state: this.gestureStateY,
          },
        },
      ],
      { useNativeDriver: true },
    );
  }

  render() {
    const {
      onGestureEventX, onGestureEventY, translationX, translationY, offsetX, offsetY, prevTranslationX, prevTranslationY, gestureStateX,
      gestureStateY, velocityX, velocityY, clockX, clockY, currentIndex,
    } = this;
    const { sections } = this.props;
    const lowerBoundX = -width * (sections.length - 1);
    const upperBoundX = 0;
    const lowerBoundY = -width * 2;
    const upperBoundY = 0;
    const y = scroll(gestureStateY, offsetY, translationY, prevTranslationY, velocityY, lowerBoundY, upperBoundY, clockY, snapY, currentIndex);
    const x = scroll(gestureStateX, offsetX, translationX, prevTranslationX, velocityX, lowerBoundX, upperBoundX, clockX, snapX, currentIndex);
    // const x2 = cond(lessOrEq(y, -height + MEDIUM_HEADER_SIZE), _x, offsetX);
    return (
      <PanGestureHandler
        onHandlerStateChange={onGestureEventX}
        onGestureEvent={onGestureEventX}
        ref={this.horizontalHandler}
        waitFor={this.verticalHandler}
        minDist={10}
        failOffsetY={[-10, 10]}
      >
        <Animated.View style={{ flex: 1 }}>
          <PanGestureHandler
            ref={this.verticalHandler}
            onHandlerStateChange={onGestureEventY}
            onGestureEvent={onGestureEventY}
            minDist={10}
            failOffsetX={[-10, 10]}
          >
            <Animated.View style={{ flex: 1 }}>
              <HorizontalScroll numberOfSections={sections.length} {...{ x }}>
                <Headers {...{
                  sections, y, x, currentIndex,
                }}
                />
                <Content {...{ sections, y }} />
              </HorizontalScroll>
            </Animated.View>
          </PanGestureHandler>
        </Animated.View>
      </PanGestureHandler>

    );
  }
}
