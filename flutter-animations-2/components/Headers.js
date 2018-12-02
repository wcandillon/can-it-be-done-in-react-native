// @flow
import * as React from 'react';
import { View, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';

import {
  type Section, SMALL_HEADER_HEIGHT, MEDIUM_HEADER_HEIGHT,
} from './Model';
import Header from './Header';
import Label from './Label';

const {
  Value, Extrapolate, interpolate, add, multiply,
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
            const translateX = this.tX(key);
            const translateY = this.tY(key);
            return (
              <Animated.View
                style={{
                  height: headerHeight,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transform: [
                    { translateX },
                    { translateY },
                  ],
                }}
                {...{ key }}
              >
                <Header index={key} {...{ section }} />
              </Animated.View>
            );
          })
        }
        {
          sections.map((section, key) => {
            const translateX = this.tX(key);
            const translateY = this.tY(key);
            return (
              <Animated.View
                style={{
                  height: headerHeight,
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  transform: [
                    { translateX },
                    { translateY },
                  ],
                }}
                {...{ key }}
              >
                <Label index={key} {...{ section, x, y }} />
              </Animated.View>
            );
          })
        }
      </View>
    );
  }
}
