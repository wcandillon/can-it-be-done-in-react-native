// @flow
import * as React from 'react';
import {
  StyleSheet, View, Image, SafeAreaView,
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
        <Image style={styles.image} {...{ source }} />
        <SafeAreaView style={styles.story}>
          <Avatar {...{ user, avatar }} />
          <View style={styles.footer}>
            <Icon name="camera" color="white" size={28} style={{ marginRight: 16 }} />
            <Icon name="message-circle" color="white" size={28} />
          </View>
        </SafeAreaView>
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
    justifyContent: 'space-between',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
    borderRadius: 5,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 10,
    width: 250,
    height: 28,
  },
});
