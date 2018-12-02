// @flow
import * as React from 'react';
import { View, StyleSheet } from 'react-native';

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
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cursor: {
    width: 50,
    height: 5,
    backgroundColor: 'white',
  },
});
