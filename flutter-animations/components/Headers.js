// @flow
import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';

import Header from './Header';

const {
  event, Value, interpolate, call, block,
} = Animated;
const { width, height: wHeight } = Dimensions.get('window');

type HeadersProps = {
  sections: Section[],
};

export default class Headers extends React.PureComponent<HeadersProps> {
  constructor(props: HeadersProps) {
    super(props);
    this.translationY = new Value(0);
    this.onGestureEvent = event(
      [
        {
          nativeEvent: {
            translationY: this.translationY,
          },
        },
      ],
      { useNativeDriver: true },
    );
  }

  render() {
    const { onGestureEvent, translationY } = this;
    const { sections } = this.props;
    const height = interpolate(
      translationY,
      {
        inputRange: [-wHeight, 0],
        outputRange: [64, wHeight / sections.length],
      },
    );
    return (
      <PanGestureHandler onHandlerStateChange={onGestureEvent} {...{ onGestureEvent }}>
        <View>
          {
          sections.map(section => (
            <Animated.View key={section.title} style={{ width, height }}>
              <Header
                key={section.title}
                numberOfHeaders={sections.length}
                {...{ section }}
              />
            </Animated.View>
          ))
        }
        </View>
      </PanGestureHandler>
    );
  }
}

const styles = StyleSheet.create({
});
