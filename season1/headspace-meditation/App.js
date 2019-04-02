// @flow
import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { Progress2 } from './components';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./assets/bg.png')} style={styles.background} />
        <Progress2 />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
});
