// @flow
import * as React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Icon as ExpoIcon } from 'expo';

type IconProps = {
  name: string,
  label: string,
};

export default class Icon extends React.PureComponent<IconProps> {
  render() {
    const { name, label } = this.props;
    return (
      <View style={styles.container}>
        <ExpoIcon.Feather style={styles.icon} {...{ name }} />
        <Text style={styles.label}>{label}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    color: 'gray',
  },
  label: {
    color: 'gray',
    textAlign: 'center',
    marginTop: 8,
  },
});
