// @flow
import * as React from 'react';
import { View, StyleSheet } from 'react-native';


type MockCardProps = {
  image: string,
};

export default class MockCard extends React.PureComponent<MockCardProps> {
  render() {
    const { image: source } = this.props;
    return (
      <View style={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
  },
});
