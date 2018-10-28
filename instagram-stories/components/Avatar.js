// @flow
import * as React from 'react';
import {
  StyleSheet, View, Image, Text,
} from 'react-native';
import type { ImageSourcePropType } from 'react-native/Libraries/Image/ImageSourcePropType';

type AvatarProps = {
  user: string,
  avatar: ImageSourcePropType,
};

export default class Avatar extends React.PureComponent<AvatarProps> {
  render(): React.Node {
    const { user, avatar: source } = this.props;
    return (
      <View style={styles.container}>
        <Image {...{ source }} style={styles.avatar} />
        <Text style={styles.username}>{user}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 36 / 2,
    marginRight: 16,
  },
  username: {
    color: 'white',
    fontSize: 16,
  },
});
