// @flow
import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import Header from './Header';

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
        inputRange: [-wHeight, 0],
        outputRange: [sectionHeight, sectionHeight], // 64 + 45],
        extrapolate: Extrapolate.CLAMP,
      },
    );
    return (
      <React.Fragment>
        {
          sections.map((section, key) => {
            const translateX = interpolate(y, {
              inputRange: [-wHeight, 0],
              outputRange: [key * width, 0],
              extrapolate: Extrapolate.CLAMP,
            });
            const translateY = interpolate(y, {
              inputRange: [-wHeight, 0],
              outputRange: [-key * sectionHeight, 0],
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
