// @flow
import * as React from 'react';
import {
  View, StyleSheet, Text, Dimensions,
} from 'react-native';
import { Icon } from 'expo';

const { width } = Dimensions.get('window');
export const PLACEHOLDER_WIDTH = width / 3;

type PlayerControlsProps = {
  title: string,
};

export default class PlayerControls extends React.PureComponent<PlayerControlsProps> {
  render() {
    const { title } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.placeholder} />
        <Text style={styles.title}>{title}</Text>
        <Icon.Feather style={styles.icon} name="play" />
        <Icon.Feather style={styles.icon} name="x" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  title: {
    flex: 1,
    flexWrap: 'wrap',
    paddingLeft: 8,
  },
  placeholder: {
    width: PLACEHOLDER_WIDTH,
  },
  icon: {
    fontSize: 24,
    color: 'gray',
    padding: 8,
  },
});
