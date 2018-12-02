// @flow
import * as React from 'react';
import { View, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';

import {
  type Section, SMALL_HEADER_HEIGHT, MEDIUM_HEADER_HEIGHT, PADDING, CURSOR_WIDTH,
} from './Model';
import Header from './Header';
import Label from './Label';
import Cursor from './Cursor';

const {
  Value, Extrapolate, interpolate, add, multiply, divide, greaterThan, cond,
} = Animated;

type HeadersProps = {
  sections: Section[],
  x: Value,
  y: Value,
};

const backgroundColor = '#343761';
const { width, height } = Dimensions.get('window');

export default class Headers extends React.PureComponent<HeadersProps> {
  tX = (index: number) => {
    const { x, y } = this.props;
    return add(interpolate(y, {
      inputRange: [0, height - MEDIUM_HEADER_HEIGHT],
      outputRange: [x, index * width],
      extrapolate: Extrapolate.CLAMP,
    }), multiply(x, -1));
  }

  tY = (index: number) => {
    const { y, sections } = this.props;
    const FULL_HEADER_HEIGHT = height / sections.length;
    return interpolate(y, {
      inputRange: [0, height - MEDIUM_HEADER_HEIGHT, height - SMALL_HEADER_HEIGHT],
      outputRange: [index * FULL_HEADER_HEIGHT, 0, 0],
      extrapolate: Extrapolate.CLAMP,
    });
  }

  getStyle = (headerHeight: Value, index: number) => {
    const translateX = this.tX(index);
    const translateY = this.tY(index);
    return {
      height: headerHeight,
      position: 'absolute',
      top: 0,
      left: 0,
      transform: [
        { translateX },
        { translateY },
      ],
    };
  };

  render() {
    const { sections, x, y } = this.props;
    const FULL_HEADER_HEIGHT = height / sections.length;
    const headerHeight = interpolate(y, {
      inputRange: [0, height - MEDIUM_HEADER_HEIGHT, height - SMALL_HEADER_HEIGHT],
      outputRange: [FULL_HEADER_HEIGHT, MEDIUM_HEADER_HEIGHT, SMALL_HEADER_HEIGHT],
      extrapolate: Extrapolate.CLAMP,
    });
    return (
      <View style={{ height, width: sections.length * width, backgroundColor }}>
        {
          sections.map((section, key) => {
            const style = this.getStyle(headerHeight, key);
            return (
              <Animated.View {...{ key, style }}>
                <Header index={key} {...{ section }} />
              </Animated.View>
            );
          })
        }
        {
          sections.map((section, key) => {
            const style = this.getStyle(headerHeight, key);
            return (
              <Animated.View {...{ key, style }}>
                <Label index={key} {...{ section, x, y }} />
              </Animated.View>
            );
          })
        }
        {
          sections.map((section, key) => {
            const opacity = interpolate(x, {
              inputRange: key === 0 ? [0, 0, width] : [width * (key - 1), width * key, width * (key + 1)],
              outputRange: [0.5, 1, 0.5],
              extrapolate: Extrapolate.CLAMP,
            });
            const translateX1 = interpolate(y, {
              inputRange: [0, height - MEDIUM_HEADER_HEIGHT],
              outputRange: [-width / 2 + CURSOR_WIDTH / 2 + PADDING, 0],
              extrapolate: Extrapolate.CLAMP,
            });
            const translateX2 = interpolate(y, {
              inputRange: [0, height - MEDIUM_HEADER_HEIGHT, height - SMALL_HEADER_HEIGHT],
              outputRange: [0, (width / 2) * key, (CURSOR_WIDTH + PADDING) * key - width / 4 + PADDING * 2],
              extrapolate: Extrapolate.CLAMP,
            });
            const translateX = add(translateX1, translateX2);
            const translateY = interpolate(y, {
              inputRange: [0, height - MEDIUM_HEADER_HEIGHT],
              outputRange: [multiply(headerHeight, key), 0],
              extrapolate: Extrapolate.CLAMP,
            });
            const style = {
              height: headerHeight,
              position: 'absolute',
              top: 0,
              left: 0,
              opacity,
              transform: [
                { translateY },
                { translateX },
              ],
            };
            return (
              <Animated.View {...{ key, style }}>
                <Cursor />
              </Animated.View>
            );
          })
        }
      </View>
    );
  }
}
