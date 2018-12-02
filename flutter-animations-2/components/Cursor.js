// @flow
import * as React from 'react';
import { View, StyleSheet } from 'react-native';

import { type Section, PADDING } from './Model';

type CursorProps = {
};


export default class Cursor extends React.PureComponent<CursorProps> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cursor} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
  },
  cursor: {
    top: 36,
    left: PADDING,
    width: 50,
    height: 5,
    backgroundColor: 'white',
  },
});
