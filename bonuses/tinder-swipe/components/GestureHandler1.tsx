import * as React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { DangerZone } from "expo";

import { onScroll } from "./AnimationHelpers";

const { Animated } = DangerZone;
const { Value, debug, block } = Animated;
const { width, height } = Dimensions.get("window");

interface GestureHandlerProps {
  x: typeof Value;
  y: typeof Value;
}

export default class extends React.PureComponent<GestureHandlerProps> {
  horizontal = React.createRef();

  componentDidMount() {
    setTimeout(() => {
      // this.horizontal.current.getNode().scrollTo({ x: width / 2, animated: false });
    }, 5000);
  }

  render() {
    const { x } = this.props;
    return (
      <Animated.ScrollView
        ref={this.horizontal}
        style={StyleSheet.absoluteFill}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ width: width * 2 }}
        snapPoint={width / 2}
        onScroll={onScroll({ x })}
        scrollEventThrottle={1}
        decelerationRate="fast"
        horizontal
      />
    );
  }
}
