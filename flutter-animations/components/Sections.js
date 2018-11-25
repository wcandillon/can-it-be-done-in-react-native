// @flow
import * as React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';

import Headers from './Headers';

const { height } = Dimensions.get('window');
const { event, Value } = Animated;

type SectionsProps = {
  sections: Section[],
};

export default class Sections extends React.PureComponent<SectionsProps> {
  constructor(props: SectionsProps) {
    super(props);
    this.y = new Value(0);
    this.onScroll = event(
      [
        {
          nativeEvent: {
            contentOffset: { y: this.y },
          },
        },
      ],
      { useNativeDriver: true },
    );
  }

  render() {
    const { onScroll, y } = this;
    const { sections } = this.props;
    return (
      <View style={styles.container}>
        <Headers scrollDriver={y} {...{ sections }} />
        <Animated.ScrollView
          bounces={false}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          contentContainerStyle={styles.content}
          style={StyleSheet.absoluteFillObject}
          {...{ onScroll }}
        >
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    minHeight: height * 2,
  },
});
