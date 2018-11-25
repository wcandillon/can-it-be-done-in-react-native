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
        <View>
          <Image style={styles.image} {...{ source }} />
        </View>
        <View>
          <Text>React Native enables interactive animation</Text>
          <Text>3K views - 5 days</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {

  },
});
