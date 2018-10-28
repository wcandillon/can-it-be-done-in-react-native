// @flow
import * as React from 'react';
import {
  StyleSheet, View, Image, SafeAreaView, TextInput,
} from 'react-native';
import type { ImageSourcePropType } from 'react-native/Libraries/Image/ImageSourcePropType';
import { Feather as Icon } from '@expo/vector-icons';

import Avatar from './Avatar';

export type Story = {
  id: string,
  source: ImageSourcePropType,
  user: string,
  avatar: ImageSourcePropType,
};

type StoryProps = {
  story: Story,
};

export default class extends React.PureComponent<StoryProps> {
  render(): React.Node {
    const { story: { source, user, avatar } } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.story}>
          <Image style={styles.image} {...{ source }} />
          <Avatar {...{ user, avatar }} />
        </View>
        <View style={styles.footer}>
          <Icon name="camera" color="white" size={28} />
          <TextInput style={styles.input} />
          <Icon name="message-circle" color="white" size={28} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  story: {
    flex: 1,
    borderRadius: 5,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
    borderRadius: 5,
  },
  footer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    width: 250,
    height: 28,
  },
});
