// @flow
import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Story extends React.PureComponent<{ color: string }> {
  render(): React.Node {
    const { color: backgroundColor } = this.props;
    return (
      <View style={[styles.container, { backgroundColor }]}>
        <Text style={styles.text}>Hello</Text>
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
  text: {
    fontSize: 72,
    color: 'white',
  },
});
