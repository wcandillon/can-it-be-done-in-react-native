// @flow
import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

import { CURSOR_WIDTH } from './Model';

type CursorProps = {
};

const { width } = Dimensions.get('window');

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
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cursor: {
    top: 30,
    width: CURSOR_WIDTH,
    height: 5,
    backgroundColor: 'white',
  },
});
