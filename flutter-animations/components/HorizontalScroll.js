// @flow
import * as React from 'react';
import { Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';

import { SMALL_HEADER_SIZE, MEDIUM_HEADER_SIZE } from './Headers';

const {
  interpolate, Extrapolate, cond, lessOrEq, block, call, lessThan, eq, neq,
} = Animated;
const { width, height } = Dimensions.get('window');

type HorizontalScrollProps = {
  numberOfSections: number,
  x: Value,
  children: React.Node,
};

export default class HorizontalScroll extends React.PureComponent<HorizontalScrollProps> {
  render() {
    const {
      x: translateX, children, numberOfSections,
    } = this.props;
    /*
    const lowerBound = -width * (numberOfSections - 1);
    const translateX = interpolate(x, {
      inputRange: [lowerBound, 0],
      outputRange: [lowerBound, 0],
      extrapolate: Extrapolate.CLAMP,
    });
    */
    return (
      <Animated.View style={{ flex: 1, transform: [{ translateX }] }}>
        {children}
      </Animated.View>
    );
  }
}
