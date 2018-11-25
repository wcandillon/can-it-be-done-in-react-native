// @flow
import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler, State } from 'react-native-gesture-handler';

import Headers from './Headers';

const { height, width } = Dimensions.get('window');
const {
  event, Extrapolate, Value, add, cond, set, eq, sub, interpolate, greaterThan, lessOrEq,
} = Animated;

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
    this.gestureState = new Value(State.UNDETERMINED);
    this.onGestureEvent = event(
      [
        {
          nativeEvent: {
            translationY: this.translationY,
            translationX: this.translationX,
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
    } = this;
    const { sections } = this.props;
    const x = cond(
      eq(gestureState, State.ACTIVE),
      [
        set(offsetX, add(offsetX, sub(translationX, prevTranslationX))),
        set(prevTranslationX, translationX),
        offsetX,
      ],
      [set(prevTranslationX, 0), offsetX],
    );
    const y = cond(
      eq(gestureState, State.ACTIVE),
      [
        set(offsetY, add(offsetY, sub(translationY, prevTranslationY))),
        set(prevTranslationY, translationY),
        offsetY,
      ],
      [set(prevTranslationY, 0), offsetY],
    );
    const translateX = cond(lessOrEq(y, -height), interpolate(x, {
      inputRange: [-width * sections.length, 0],
      outputRange: [-width * sections.length, 0],
      extrapolate: Extrapolate.CLAMP,
    }), 0);
    return (
      <PanGestureHandler
        onHandlerStateChange={onGestureEvent}
        {...{ onGestureEvent }}
      >
        <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
          <Headers {...{ sections, y }} />
        </Animated.View>
      </PanGestureHandler>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
