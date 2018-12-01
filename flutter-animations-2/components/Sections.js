// @flow
import * as React from 'react';
import { View, Dimensions, ScrollView, StyleSheet } from 'react-native';
import Animated from "react-native-reanimated";

const {Value, event, block, call} = Animated;
const {width, height} = Dimensions.get("window");

type SectionsProps = {
  sections: Section[]
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
)

export default class Sections extends React.PureComponent<SectionsProps> {

  constructor(props: SectionsProps) {
    super(props);
    this.x = new Value(0);
    this.y = new Value(0);
    this.onScrollX = onScroll({ x: this.x });
    this.onScrollY = onScroll({ y: this.y });
  }

  render() {
    const {x, y, onScrollX, onScrollY} = this;
    const {sections} = this.props;
    return (
      <View style={styles.container}>
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={onScrollY}
          bounces={false}
          vertical
        >
          <Animated.ScrollView
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={16}
            onScroll={onScrollX}
            bounces={false}
            horizontal
          >
            <View style={{ width: sections.length * width, height: height * 2, backgroundColor: "red" }}>

            </View>
          </Animated.ScrollView>
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});