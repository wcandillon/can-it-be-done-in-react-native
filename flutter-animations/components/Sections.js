// @flow
import * as React from 'react';
import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import Headers from './Headers';
import Content from './Content';
import HorizontalScroll from './HorizontalScroll';

const { height, width } = Dimensions.get('window');
const {
  event, Extrapolate, Value, add, cond, set, eq, sub, interpolate, greaterThan, lessOrEq, lessThan,
} = Animated;


const bound = (offset: Value, lowerBound: Value, higherBound: Value): Value => cond(
  lessThan(offset, lowerBound),
  lowerBound,
  cond(greaterThan(offset, higherBound), 0, offset),
);
const scroll = (
  gestureState: Value, offset: Value, translation: Value, prevTranslation: Value,
  velocity: Value, lowerBound: Value, higherBound: Value,
): Value => cond(
  eq(gestureState, State.ACTIVE),
  [
    set(offset, add(offset, sub(translation, prevTranslation))),
    set(prevTranslation, translation),
    offset,
  ],
  [
    set(prevTranslation, 0),
    set(offset, bound(offset, lowerBound, higherBound)),
    offset,
  ],
);

type SectionsProps = {
  sections: Section[],
};

export default class Sections extends React.PureComponent<SectionsProps> {
  constructor(props: SectionsProps) {
    super(props);
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
      velocityX, velocityY,
    } = this;
    const { sections } = this.props;
    const x = scroll(gestureState, offsetX, translationX, prevTranslationX, velocityX, -width * (sections.length - 1), 0);
    const y = scroll(gestureState, offsetY, translationY, prevTranslationY, velocityY, -width * 2, 0);
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
