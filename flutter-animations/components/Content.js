// @flow
import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';

import { type Section } from './Model';
import MockEntry from './MockEntry';
import MockCard from './MockCard';
import { MIN_HEADER_SIZE } from './Headers';

const { Value, interpolate, Extrapolate } = Animated;
const { height } = Dimensions.get('window');

type ContentProps = {
  y: Value,
  sections: Section[],
};

export default class Content extends React.PureComponent<ContentProps> {
  render() {
    const { sections, y } = this.props;
    const translateY = interpolate(y, {
      inputRange: [-height, MIN_HEADER_SIZE],
      outputRange: [-height, MIN_HEADER_SIZE],
      extrapolate: Extrapolate.CLAMP,
    });
    return (
      <Animated.View style={[styles.container, { transform: [{ translateY }] }]}>
        {
        sections.map(({ image }, key) => (
          <View {...{ key }}>
            <MockEntry {...{ image }} />
            <MockCard {...{ image }} />
            <MockEntry {...{ image }} />
            <MockEntry {...{ image }} />
            <MockEntry {...{ image }} />
            <MockEntry {...{ image }} />
          </View>
        ))
        }
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
