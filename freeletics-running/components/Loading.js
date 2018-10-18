// @flow
import * as React from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

// eslint-disable-next-line react/prefer-stateless-function
export default class Loading extends React.PureComponent<{}> {
  render(): React.Node {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222222',
  },
});
