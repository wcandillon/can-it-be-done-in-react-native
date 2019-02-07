// @flow
import * as React from 'react';
import {
  View, StyleSheet, Text, Dimensions, TouchableWithoutFeedback,
} from 'react-native';
import { Icon } from 'expo';
import PlayerContext from './PlayerContext';

const { width } = Dimensions.get('window');
export const PLACEHOLDER_WIDTH = width / 3;

type PlayerControlsProps = {
  title: string,
  onPress: () => mixed,
};

export default class PlayerControls extends React.PureComponent<PlayerControlsProps> {
  render() {
    const { title, onPress } = this.props;
    return (
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
          <View style={styles.placeholder} />
          <Text style={styles.title} numerOfLine={3}>{title}</Text>
          <Icon.Feather style={styles.icon} name="play" />
          <PlayerContext.Consumer>
            {
              ({ setVideo }) => (
                <TouchableWithoutFeedback onPress={() => setVideo(null)}>
                  <Icon.Feather style={styles.icon} name="x" />
                </TouchableWithoutFeedback>
              )
            }

          </PlayerContext.Consumer>
        </View>
      </TouchableWithoutFeedback>
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
