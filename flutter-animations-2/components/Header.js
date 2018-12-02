// @flow
import * as React from 'react';
import {
  View, StyleSheet, Image, Dimensions, Platform,
} from 'react-native';
import { LinearGradient } from 'expo';
import Animated from 'react-native-reanimated';

import { SMALL_HEADER_HEIGHT, MEDIUM_HEADER_HEIGHT } from './Model';

const { Value, interpolate, Extrapolate } = Animated;

type HeaderProps = {
  section: Section,
  index: number,
  x: Value,
  y: Value,
};

const CURSOR_WIDTH = 50;
const PADDING = 8;
const { width, height } = Dimensions.get('window');
// Character width is 19.3 on iOS and 19 on Android
const charWidth = Platform.OS === 'ios' ? 19.3 : 19;
const fontSize = 32;
const fontFamily = Platform.OS === 'ios' ? 'Menlo' : 'monospace';

export default class Header extends React.PureComponent<HeaderProps> {
  render() {
    const {
      section, x, y, index,
    } = this.props;
    const colors = [section.leftColor, section.rightColor];
    const opacity = interpolate(x, {
      inputRange: index === 0 ? [0, 0, width] : [width * (index - 1), width * index, width * (index + 1)],
      outputRange: [0.5, 1, 0.5],
      extrapolate: Extrapolate.CLAMP,
    });
    const labelWidth = interpolate(y, {
      inputRange: [0, height - MEDIUM_HEADER_HEIGHT, height - SMALL_HEADER_HEIGHT],
      outputRange: [section.title.length * charWidth, width, width],
      extrapolate: Extrapolate.CLAMP,
    });
    const translateCursorX = interpolate(y, {
      inputRange: [0, height - MEDIUM_HEADER_HEIGHT, height - SMALL_HEADER_HEIGHT],
      outputRange: [-width / 2 + PADDING + CURSOR_WIDTH / 2, 0, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    return (
      <View style={styles.container}>
        <Image source={section.image} style={styles.image} />
        <LinearGradient
          style={styles.gradient}
          start={[0, 0]}
          end={[1, 0]}
          {...{ colors }}
        />
        <Animated.View style={[styles.labelContainer, { opacity }]}>
          <Animated.Text style={[styles.label, { width: labelWidth }]}>{section.title.toUpperCase()}</Animated.Text>
        </Animated.View>
        <Animated.View style={[styles.cursorContainer, { opacity, transform: [{ translateX: translateCursorX }] }]}>
          <View style={styles.cursor} />
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.9,
  },
  labelContainer: {
    ...StyleSheet.absoluteFillObject,
    padding: PADDING,
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
    padding: PADDING,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cursor: {
    width: CURSOR_WIDTH,
    height: 4,
    backgroundColor: 'white',
    top: 32,
  },
});
