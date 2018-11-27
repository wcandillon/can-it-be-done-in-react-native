// @flow
import * as React from 'react';
import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';

import { SMALL_HEADER_SIZE } from './Headers';

const {
  interpolate, Extrapolate, cond, lessOrEq, block, call,
} = Animated;
const { width, height } = Dimensions.get('window');

type HorizontalScrollProps = {
  numberOfSections: number,
  x: Value,
  y: Value,
  children: React.Node,
};

export default class HorizontalScroll extends React.PureComponent<HorizontalScrollProps> {
  render() {
    const {
      y, x, children, numberOfSections,
    } = this.props;
    const translateX = cond(lessOrEq(y, -height + SMALL_HEADER_SIZE), interpolate(x, {
      inputRange: [-width * (numberOfSections - 1), 0],
      outputRange: [-width * (numberOfSections - 1), 0],
      extrapolate: Extrapolate.CLAMP,
    }), 0);
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
        {children}
      </Animated.View>
    );
  }
}
