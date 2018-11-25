// @flow
import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import Header from './Header';

export const MIN_HEADER_SIZE = 45 + 64;
const {
  Extrapolate, event, Value, interpolate,
} = Animated;
const { width, height: wHeight } = Dimensions.get('window');

type HeadersProps = {
  sections: Section[],
  y: Value,
};

export default class Headers extends React.PureComponent<HeadersProps> {
  render() {
    const { sections, y } = this.props;
    const sectionHeight = wHeight / sections.length;
    const height = interpolate(
      y,
      {
        inputRange: [-wHeight + MIN_HEADER_SIZE, 0],
        outputRange: [MIN_HEADER_SIZE, sectionHeight],
        extrapolate: Extrapolate.CLAMP,
      },
    );
    const containerHeight = interpolate(y, {
      inputRange: [-wHeight + MIN_HEADER_SIZE, 0],
      outputRange: [MIN_HEADER_SIZE, wHeight],
      extrapolate: Extrapolate.CLAMP,
    });
    return (
      <Animated.View style={[styles.container, { height: containerHeight }]}>
        {
          sections.map((section, key) => {
            const translateX = interpolate(y, {
              inputRange: [-wHeight + MIN_HEADER_SIZE, 0],
              outputRange: [key * width, 0],
              extrapolate: Extrapolate.CLAMP,
            });
            const translateY = interpolate(y, {
              inputRange: [-wHeight, 0],
              outputRange: [-key * MIN_HEADER_SIZE, 0],
              extrapolate: Extrapolate.CLAMP,
            });
            return (
              <Animated.View
                key={section.title}
                style={{
                  width,
                  height,
                  transform: [{ translateY, translateX }],
                }}
              >
                <Header
                  numberOfHeaders={sections.length}
                  {...{ key, section }}
                />
              </Animated.View>
            );
          })
        }
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#343761',
  },
});
