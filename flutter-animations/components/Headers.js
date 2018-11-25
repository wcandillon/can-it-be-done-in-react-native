// @flow
import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import Header from './Header';

const {
  Extrapolate, event, Value, interpolate, call, block,
} = Animated;
const { width, height: wHeight } = Dimensions.get('window');

type HeadersProps = {
  sections: Section[],
};

export default class Headers extends React.PureComponent<HeadersProps> {
  constructor(props: HeadersProps) {
    super(props);
    this.translationY = new Value(0);
    this.onGestureEvent = event(
      [
        {
          nativeEvent: {
            translationY: this.translationY,
          },
        },
      ],
      { useNativeDriver: true },
    );
  }

  render() {
    const { onGestureEvent, translationY } = this;
    const { sections } = this.props;
    const sectionHeight = wHeight / sections.length;
    const height = interpolate(
      translationY,
      {
        inputRange: [-wHeight, 0],
        outputRange: [64, sectionHeight],
        extrapolate: Extrapolate.CLAMP,
      },
    );
    return (
      <PanGestureHandler onHandlerStateChange={onGestureEvent} {...{ onGestureEvent }}>
        <Animated.View>
          {
          sections.map((section, key) => {
            const translateX = interpolate(translationY, {
              inputRange: [-wHeight, 0],
              outputRange: [key * width, 0],
              extrapolate: Extrapolate.CLAMP,
            });
            const translateY = interpolate(translationY, {
              inputRange: [-wHeight, 0],
              outputRange: [-key * sectionHeight, 0],
              extrapolate: Extrapolate.CLAMP,
            });
            return (
              <Animated.View key={section.title} style={{ width, height, transform: [{ translateX }, { translateY }] }}>
                <Header
                  numberOfHeaders={sections.length}
                  {...{ key, section }}
                />
              </Animated.View>
            );
          })
        }
        </Animated.View>
      </PanGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
});
