// @flow
import React from 'react';
import {
  StyleSheet, View, Image, ScrollView, Animated,
} from 'react-native';
import Waveform from './src/components/Waveform';

import waveform from './data/waveform.json';

export default class App extends React.Component {
  state = {
    x: new Animated.Value(0),
  };

  render() {
    const { x } = this.state;
    return (
      <View style={styles.container}>
        <Image source={require('./data/cover.jpg')} style={styles.cover} />
        <View style={styles.content}>
          <View>
            <Animated.ScrollView
              showsHorizontalScrollIndicator={false}
              bounces={false}
              scrollEventThrottle={16}
              onScroll={Animated.event(
                [
                  {
                    nativeEvent: {
                      contentOffset: { x },
                    },
                  },
                ],
              )}
              horizontal
            >
              <View style={{ flex: 1 }}>
                <Waveform primaryColor="white" secondaryColor="#e6d0bb" {...{ waveform }} />
                <View style={StyleSheet.absoluteFillObject}>
                  <Waveform
                    primaryColor="#e95f2a"
                    secondaryColor="#f5c19f"
                    progress={x}
                    {...{ waveform }}
                  />
                </View>
              </View>
            </Animated.ScrollView>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cover: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
  content: {
    flex: 0.5,
    justifyContent: 'center',
  },
});
