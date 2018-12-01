// @flow
import * as React from 'react';
import {
  View, StyleSheet, Dimensions, Text, Platform,
} from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import Header from './Header';

export const SMALL_HEADER_SIZE = 45 + 64;
export const MEDIUM_HEADER_SIZE = 300;
// Character width is 19.3 on iOS and 19 on Android
const charWidth = Platform.OS === 'ios' ? 19.3 : 19;
const fontSize = 32;
const fontFamily = Platform.OS === 'ios' ? 'Menlo' : 'monospace';

const {
  Extrapolate, event, Value, interpolate, floor, divide, multiply, add, sub, mutiply, cond, eq,
} = Animated;
const { width, height: wHeight } = Dimensions.get('window');

type HeadersProps = {
  sections: Section[],
  y: Value,
  x: Value,
  currentIndex: Value,
};

export default class Headers extends React.PureComponent<HeadersProps> {
  render() {
    const {
      sections, y, x, currentIndex,
    } = this.props;
    const sectionHeight = wHeight / sections.length;
    const height = interpolate(
      y,
      {
        inputRange: [-wHeight + SMALL_HEADER_SIZE, -wHeight + MEDIUM_HEADER_SIZE, 0],
        outputRange: [SMALL_HEADER_SIZE, MEDIUM_HEADER_SIZE, sectionHeight],
        extrapolate: Extrapolate.CLAMP,
      },
    );
    const containerHeight = interpolate(y, {
      inputRange: [-wHeight + SMALL_HEADER_SIZE, 0],
      outputRange: [SMALL_HEADER_SIZE, wHeight],
      extrapolate: Extrapolate.CLAMP,
    });
    return (
      <Animated.View style={[styles.container, { width: width * sections.length, height: containerHeight }]}>
        {
          sections.map((section, key) => {
            const translateX = interpolate(y, {
              inputRange: [-wHeight + MEDIUM_HEADER_SIZE, 0],
              outputRange: [key * width, multiply(width, currentIndex)],
              extrapolate: Extrapolate.CLAMP,
            });
            const translateY = interpolate(y, {
              inputRange: [-wHeight + SMALL_HEADER_SIZE, -wHeight + MEDIUM_HEADER_SIZE, 0],
              outputRange: [-key * SMALL_HEADER_SIZE, -key * MEDIUM_HEADER_SIZE, 0],
              extrapolate: Extrapolate.CLAMP,
            });
            const inputRange = key === 0 ? [-width, 0, width] : [-width * (key + 1), -width * key, -width * (key - 1)];
            const opacity = interpolate(x, {
              inputRange,
              outputRange: [0.5, 1, 0.5],
              extrapolate: Extrapolate.CLAMP,
            });
            const labelWidth = interpolate(y, {
              inputRange: [-wHeight + SMALL_HEADER_SIZE, -wHeight + MEDIUM_HEADER_SIZE, 0],
              outputRange: [width, width, section.title.length * charWidth],
              extrapolate: Extrapolate.CLAMP,
            });
            const translateCursorX = interpolate(y, {
              inputRange: [-wHeight + SMALL_HEADER_SIZE, -wHeight + MEDIUM_HEADER_SIZE, 0],
              outputRange: [0, 0, (width / 2) - 50 - 8],
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
                <Animated.View style={[styles.labelContainer, { opacity }]}>
                  <Animated.Text style={[styles.label, { width: labelWidth }]}>{section.title.toUpperCase()}</Animated.Text>
                </Animated.View>
                <Animated.View style={[styles.cursorContainer, { opacity, transform: [{ translateX: translateCursorX }] }]}>
                  <View style={styles.cursor} />
                </Animated.View>
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
  labelContainer: {
    ...StyleSheet.absoluteFillObject,
    padding: 8,
    justifyContent: 'center',
  },
  label: {
    color: 'white',
    textAlign: 'center',
    fontSize,
    fontFamily,
  },
  cursorContainer: {
    ...StyleSheet.absoluteFillObject,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cursor: {
    width: 50,
    height: 4,
    backgroundColor: 'white',
    top: 32,
  },
});
