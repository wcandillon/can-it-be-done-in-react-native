// @flow
import * as React from 'react';
import { View, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';

import Headers from './Headers';
import Pages from './Pages';

const {
  Value, event, block, call,
} = Animated;
const { width, height } = Dimensions.get('window');

type SectionsProps = {
  sections: Section[],
};

const onScroll = (contentOffset: { x?: Value, y?: Value }) => event(
  [
    {
      nativeEvent: {
        contentOffset,
      },
    },
  ],
  { useNativeDriver: true },
);

export default class Sections extends React.PureComponent<SectionsProps> {
  constructor(props: SectionsProps) {
    super(props);
    this.x = new Value(0);
    this.y = new Value(0);
    this.onScrollX = onScroll({ x: this.x });
    this.onScrollY = onScroll({ y: this.y });
  }

  render() {
    const {
      x, y, onScrollX, onScrollY,
    } = this;
    const { sections } = this.props;
    return (
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={1}
        onScroll={onScrollY}
        bounces={false}
        vertical
      >
        <Animated.ScrollView
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={1}
          onScroll={onScrollX}
          bounces={false}
          snapToInterval={width}
          decelerationRate="fast"
          horizontal
        >
          <View>
            <Headers {...{ sections, y, x }} />
            <Pages {...{ sections }} />
          </View>
        </Animated.ScrollView>
      </Animated.ScrollView>
    );
  }
}
