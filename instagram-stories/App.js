// @flow
import React from 'react';
import {
  StyleSheet, Text, View, Animated, Dimensions, InteractionManager, SafeAreaView,
} from 'react-native';

import { Story } from './components';

const { width } = Dimensions.get('window');

type AppState = {
  x: Animated.Value,
};

export default class App extends React.Component<{}, AppState> {
  scroll = React.createRef();

  state = {
    x: new Animated.Value(0),
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(
      () => this.scroll.current.getNode().scrollTo({ x: width / 4, animated: false }),
    );
  }

  /*

  <Animated.View style={left}>
    <Story color="green" />
  </Animated.View>

  <Animated.View style={right}>
    <Story color="blue" />
  </Animated.View>
  */
  render() {
    const { x } = this.state;
    const translateX = x.interpolate({
      inputRange: [0, width / 2],
      outputRange: [width, -width],
      extrapolate: 'clamp',
    });
    const rotateY = x.interpolate({
      inputRange: [0, width / 2],
      outputRange: ['-90deg', '90deg'],
      extrapolate: 'clamp',
    });

    const center = {
      flex: 1,
      transform: [
        { perspective: -width / 2 },
        { translateX },
        { rotateY },
      ],
    };
    return (
      <SafeAreaView style={styles.container}>
        <Animated.View style={center}>
          <Story color="red" />
        </Animated.View>
        <Animated.ScrollView
          ref={this.scroll}
          style={StyleSheet.absoluteFillObject}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
          contentContainerStyle={{ width: width * 2 }}
          onScroll={Animated.event(
            [
              {
                nativeEvent: {
                  contentOffset: { x },
                },
              },
            ],
            { useNativeDriver: true },
          )}
          horizontal
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
