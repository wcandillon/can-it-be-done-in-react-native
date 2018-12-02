// @flow
import * as React from 'react';
import { View, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';

import { type Section, SMALL_HEADER_HEIGHT, MEDIUM_HEADER_HEIGHT } from './Model';
import Header from './Header';

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
  render() {
    const { sections, x, y } = this.props;
    const FULL_HEADER_HEIGHT = height / sections.length;
    const inputRange = [0, height - MEDIUM_HEADER_HEIGHT, height - SMALL_HEADER_HEIGHT];
    const headerHeight = interpolate(y, {
      inputRange,
      outputRange: [FULL_HEADER_HEIGHT, MEDIUM_HEADER_HEIGHT, SMALL_HEADER_HEIGHT],
      extrapolate: Extrapolate.CLAMP,
    });
    return (
      <View style={{ height, width: sections.length * width, backgroundColor }}>
        {
          sections.map((section, key) => {
            const translateX1 = interpolate(y, {
              inputRange: [0, height - MEDIUM_HEADER_HEIGHT],
              outputRange: [x, key * width],
              extrapolate: Extrapolate.CLAMP,
            });
            const translateX = add(translateX1, multiply(x, -1));
            const translateY = interpolate(y, {
              inputRange,
              outputRange: [key * FULL_HEADER_HEIGHT, 0, 0],
              extrapolate: Extrapolate.CLAMP,
            });
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
                <Header index={key} {...{ section, x, y }} />
              </Animated.View>
            );
          })
        }
      </View>
    );
  }
}
