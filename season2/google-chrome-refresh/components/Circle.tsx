import * as React from "react";
import { View } from "react-native";
import { DangerZone, Svg } from "expo";
import SVGPath from "art/modes/svg/path";

const { Animated } = DangerZone;
const {
  Value, interpolate, Extrapolate, call,
} = Animated;
const { Path } = Svg;

interface CircleProps {
  size: number;
  x: Value;
  inputRange: [number, number];
  outputRange: [number, number];
}

export default class Circle extends React.PureComponent<CircleProps> {
  path = React.createRef();

  getPath = (x: number) => {
    console.log({ x });
    const { size } = this.props;
    return SVGPath()
      .moveTo(size, 0)
      .arcTo(size * 2, size, size)
      .arcTo(size, size * 2, size)
      .arcTo(0, size)
      .arcTo(size, 0)
      .toSVG();
  }

  morphPath = ([x]: [number]) => {
    const d = this.getPath(x);
    this.path.current.setNativeProps({ d });
  };

  render() {
    const {
      size, inputRange, outputRange, x,
    } = this.props;
    const translateX = interpolate(x, {
      inputRange,
      outputRange,
      extrapolate: Extrapolate.CLAMP,
    });
    const d = this.getPath(0);
    return (
      <Animated.View style={{ transform: [{ translateX }] }}>
        <Animated.Code>
          {
            () => call([x], this.morphPath)
          }
        </Animated.Code>
        <Svg width={size * 2} height={size * 2}>
          <Path ref={this.path} fill="#656667" {...{ d }} />
        </Svg>
      </Animated.View>
    );
  }
}
