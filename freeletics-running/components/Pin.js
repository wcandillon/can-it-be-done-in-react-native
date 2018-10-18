// @flow
import * as React from 'react';
import { StyleSheet, View, Animated } from 'react-native';

type PinState = {
  animation: Animated.Value,
};

export default class Pin extends React.PureComponent<{}, PinState> {
  state = {
    animation: new Animated.Value(0),
  };

  componentDidMount() {
    const { animation } = this.state;
    Animated.loop(
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 1000,
        }),
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
        }),
      ]),
      {
        useNativeDriver: true,
      },
    ).start();
  }

  render(): React.Node {
    const { animation } = this.state;
    const scale = animation.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 1.25],
    });
    return (
      <View style={styles.outerPin}>
        <View style={styles.pin}>
          <Animated.View style={[styles.innerPin, { transform: [{ scale }] }]} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerPin: {
    backgroundColor: 'rgba(233, 172, 71, 0.25)',
    borderRadius: 40,
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pin: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerPin: {
    backgroundColor: 'rgb(233, 172, 71)',
    borderRadius: 5,
    width: 10,
    height: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
