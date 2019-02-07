// @flow
import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from 'expo';

type FooterIconProps = {
  name: string;
  label: string,
};

export default class FooterIcon extends React.PureComponent<FooterIconProps> {
  render() {
    const { name, label } = this.props;
    return (
      <View style={styles.container}>
        <Icon.Feather style={styles.icon} {...{ name }} />
        <Text style={styles.label}>{label.toUpperCase()}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
    color: 'gray',
  },
  label: {
    color: 'gray',
    marginTop: 8,
    fontSize: 8,
    fontWeight: '500',
  },
});
