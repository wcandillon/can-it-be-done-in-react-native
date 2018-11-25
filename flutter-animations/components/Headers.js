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
  scrollDriver: Value,
};

export default class Headers extends React.PureComponent<HeadersProps> {
  render() {
    const { sections, scrollDriver: y } = this.props;
    const sectionHeight = wHeight / sections.length;
    const height = interpolate(
      y,
      {
        inputRange: [0, wHeight],
        outputRange: [sectionHeight, sectionHeight], // 64 + 45],
        extrapolate: Extrapolate.CLAMP,
      },
    );
    return (
      <React.Fragment>
        {
          sections.map((section, key) => {
            const translateX = interpolate(y, {
              inputRange: [0, wHeight],
              outputRange: [0, key * width],
              extrapolate: Extrapolate.CLAMP,
            });
            const translateY = interpolate(y, {
              inputRange: [0, wHeight],
              outputRange: [0, -key * sectionHeight],
              extrapolate: Extrapolate.CLAMP,
            });
            return (
              <Animated.View key={section.title} style={{ width, height, transform: [{ translateY, translateX }] }}>
                <Header
                  numberOfHeaders={sections.length}
                  {...{ key, section }}
                />
              </Animated.View>
            );
          })
        }
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
});
