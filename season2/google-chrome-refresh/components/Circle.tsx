import * as React from "react";
import { Dimensions } from "react-native";
import { DangerZone, Svg } from "expo";
import * as shape from "d3-shape";

const { Animated } = DangerZone;
const {
  Value, interpolate, Extrapolate, call,
} = Animated;
const { Path } = Svg;
const { width } = Dimensions.get("window");

interface CircleProps {
  size: number;
  x: Value;
  inputRange: [number, number];
  outputRange: [number, number];
}

export default class Circle extends React.PureComponent<CircleProps> {
  path = React.createRef();

  getPath = (x: number) => {
    const { size } = this.props;
    return shape.line().x(d => d.x).y(d => d.y).curve(shape.curveBasis)([
      { x: 0, y: size },
      { x: size, y: 0 },
      { x: size * 4, y: size },
      { x: size, y: size * 2 },
      { x: 0, y: size },
    ]);
  }

  morphPath = ([x]: [number]) => {
    const d = this.getPath(x);
    this.path.current.setNativeProps({ d });
  };

  render() {
    const {
      size, inputRange, outputRange, x,
    } = this.props;
    const d = this.getPath(0);
    return (
      <>
        <Animated.Code>
          {
            () => call([x], this.morphPath)
          }
        </Animated.Code>
        <Svg width={width} height={size * 2}>
          <Path ref={this.path} fill="#656667" {...{ d }} />
        </Svg>
      </>
    );
  }
}
