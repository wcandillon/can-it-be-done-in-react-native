// @flow
import * as React from 'react';
import { StyleSheet, View, Image } from 'react-native';

export default class Story extends React.PureComponent<{ source: number }> {
  render(): React.Node {
    const { source } = this.props;
    return (
      <View style={styles.container}>
        <Image style={styles.image} {...{ source }} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
});
