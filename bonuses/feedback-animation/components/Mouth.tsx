import * as React from "react";
import { Dimensions } from "react-native";
import { Svg } from "expo";
import Animated from "react-native-reanimated";

import { interpolatePath } from "d3-interpolate-path";

const { Path } = Svg;
const { Value } = Animated;
const { call } = Animated;

const aspectRatio = 84 / 365;
const width = Dimensions.get("window").width / 5 - 32;
const height = width * aspectRatio;
const terrible = "M3,83.75 C62.8333333,29.25 122.666667,2 182.5,2 C242.333333,2 302.166667,29.25 362,83.75";
const great = "M3 3.75C62.833 55.917 122.667 82 182.5 82S302.167 55.917 362 3.75";
const interpolator = interpolatePath(terrible, great);

interface MouthProps {
  happiness: typeof Value
}

export default class Mouth extends React.PureComponent<MouthProps> {
  path = React.createRef<Path>();

  interpolatePath = ([happiness]: [number]) => {
    const d = interpolator(happiness);
    if (this.path.current) {
      this.path.current.setNativeProps({ d });
    }
  };

  render() {
    const { happiness } = this.props;
    return (
      <Svg viewBox="0 0 365 84" {...{ width, height }}>
        <Animated.Code>
          {
            () => call([happiness], this.interpolatePath)
          }
        </Animated.Code>
        <Path
          ref={this.path}
          d={great}
          stroke="#000"
          strokeWidth={12}
          fill="none"
        />
      </Svg>
    );
  }
}
