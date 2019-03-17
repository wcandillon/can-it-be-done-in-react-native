import * as React from "react";
import { Dimensions } from "react-native";
import { DangerZone, Svg } from "expo";

const { Animated } = DangerZone;
const {
  Value, interpolate, Extrapolate, call,
} = Animated;
const { Ellipse } = Svg;
const { width } = Dimensions.get("window");

interface CircleProps {
  size: number;
  x: Value;
  max: number;
}

export default class Circle extends React.PureComponent<CircleProps> {
  ellipse = React.createRef();

  getPath = (x: number) => {
    const { size, max } = this.props;
    console.log({ x });
    // Normal
    // cx={width / 2} cy={size} rx={size} ry={size}
    // Right
    // cx={width / 2 + size} cy={size} rx={size + size} ry={size}
    // Left
    // cx={width / 2 - size} cy={size} rx={size + size} ry={size}
    const v = x > 0 ? Math.min(x, max) : Math.max(x, -max);
    return {
      cx: width / 2 + v,
      cy: size,
      rx: size + Math.abs(v),
      ry: size,
    };
  }

  morphPath = ([x]: [number]) => {
    const path = this.getPath(x);
    this.ellipse.current.setNativeProps(path);
  };

  render() {
    const {
      size, x,
    } = this.props;
    return (
      <>
        <Animated.Code>
          {
            () => call([x], this.morphPath)
          }
        </Animated.Code>
        <Svg width={width} height={size * 2}>
          <Ellipse ref={this.ellipse} cx={width / 2 - size} cy={size} rx={size + size} ry={size} fill="#656667" />
        </Svg>
      </>
    );
  }
}
