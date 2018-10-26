// @flow
import React from 'react';
import {
  StyleSheet, View, Animated, Dimensions, StatusBar, InteractionManager, PixelRatio,
} from 'react-native';

import { Story } from './components';

const { width } = Dimensions.get('window');
const perspective = width;
const angle = Math.atan(perspective / (width / 2));

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
/*
, {
  id: '3',
  source: require('./assets/3.jpg'),
}, */

type AppState = {
  x: Animated.Value,
};

export default class App extends React.Component<{}, AppState> {
  scroll = React.createRef();

  state = {
    x: new Animated.Value(0),
  };

  componentDidMount() {
    setTimeout(() => this.scroll.current.getNode().scrollTo({ x: width / 2, animated: true }), 1000);
  }

  getStyle(index: number) {
    const { x } = this.state;
    const offset = index * width;
    const translateX = x.interpolate({
      inputRange: [offset - width, offset, offset + width],
      outputRange: [width, 0, -width],
      extrapolate: 'clamp',
    });
    const rotateY = x.interpolate({
      inputRange: [offset - width, offset, offset + width],
      outputRange: [`${angle}rad`, '0rad', `-${angle}rad`],
      extrapolate: 'clamp',
    });
    const v = (width / 2) - ((width / 4) / Math.cos(angle / 2));
    const translateXAfter = x.interpolate({
      inputRange: [offset - width / 2, offset, offset + width / 2],
      outputRange: [v, 0, -v],
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
        <StatusBar barStyle="light-content" />
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
