// @flow
import React from 'react';
import {
  StyleSheet, Text, View, Animated, Dimensions, InteractionManager, SafeAreaView,
} from 'react-native';

import { Story } from './components';

const { width } = Dimensions.get('window');
const perspective = width;
const stories = [
  {
    id: '1',
    source: require('./assets/1.jpg'),
  }, {
    id: '2',
    source: require('./assets/2.jpg'),
  }, {
    id: '3',
    source: require('./assets/3.jpg'),
  },
];
type AppState = {
  x: Animated.Value,
};

export default class App extends React.Component<{}, AppState> {
  scroll = React.createRef();

  state = {
    x: new Animated.Value(0),
  };

  getStyle(index: number) {
    const { x } = this.state;
    const offset = index * width;
    const translateX = x.interpolate({
      inputRange: [offset - width, offset, offset + width],
      outputRange: [width / 2, 0, -width / 2],
      extrapolate: 'clamp',
    });
    const rotateY = x.interpolate({
      inputRange: [offset - width, offset, offset + width],
      outputRange: ['60deg', '0deg', '-60deg'],
      extrapolate: 'clamp',
    });
    const translateXAfter = x.interpolate({
      inputRange: [offset - width, offset, offset + width],
      outputRange: [width / 2.38, 0, -width / 2.38],
      extrapolate: 'clamp',
    });
    return {
      ...StyleSheet.absoluteFillObject,
      transform: [
        { perspective },
        { translateX },
        { rotateY },
        { translateX: translateXAfter },
      ],
    };
  }

  render() {
    const { x } = this.state;
    return (
      <View style={styles.container}>
        {
          stories.map((story, i) => (
            <Animated.View style={this.getStyle(i)} key={story.id}>
              <Story {...{ story }} />
            </Animated.View>
          ))
        }
        <Animated.ScrollView
          ref={this.scroll}
          style={StyleSheet.absoluteFillObject}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
          bounces={false}
          snapToInterval={width}
          contentContainerStyle={{ width: width * stories.length }}
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
