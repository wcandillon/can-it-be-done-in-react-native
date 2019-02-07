// @flow
import * as React from 'react';
import {
  View, Image, Text, StyleSheet,
} from 'react-native';

type MockEntryProps = {
  image: string,
};

export default class MockEntry extends React.PureComponent<MockEntryProps> {
  render() {
    const { image: source } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.leftCell}>
          <Image style={styles.image} {...{ source }} />
        </View>
        <View style={styles.rightCell}>
          <Text>React Native enables interactive animation</Text>
          <Text style={styles.subtitle}>3K views - 5 days</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  leftCell: {
    padding: 8,
  },
  rightCell: {
    paddingVertical: 8,
    paddingRight: 8,
    justifyContent: 'center',
  },
  image: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },
  subtitle: {
    color: 'gray',
  },
});
