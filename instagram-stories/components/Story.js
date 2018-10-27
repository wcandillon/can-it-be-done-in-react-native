// @flow
import * as React from 'react';
import {
  StyleSheet, View, Image, Platform,
} from 'react-native';
import type { ImageSourcePropType } from 'react-native/Libraries/Image/ImageSourcePropType';

type Story = {
  id: string,
  source: ImageSourcePropType,
};

type StoryProps = {
  story: Story,
};

export default class extends React.PureComponent<StoryProps> {
  render(): React.Node {
    const { story: { source } } = this.props;
    if (Platform.OS === 'android') {
      return <View style={[styles.container, { backgroundColor: getRandomColor() }]} />;
    }
    // <View style={[styles.container, { backgroundColor: getRandomColor() }]} />
    return (
      <View style={[styles.container, { backgroundColor: getRandomColor() }]}>
        <Image style={styles.image} {...{ source }} />
      </View>
    );
  }
}
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: null,
    height: null,
  },
});
