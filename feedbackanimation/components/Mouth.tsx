import * as React from "react";
import { View, Dimensions } from "react-native";
import { Svg, DangerZone } from "expo";
import { interpolatePath } from "d3-interpolate-path";

const { Path } = Svg;
const { Animated } = DangerZone;
const { Value, call } = Animated;

const { width } = Dimensions.get("window");
const paths = [
  "M14.295 0C7.63 0 2 5.76 2 12.578a1.5 1.5 0 1 0 3 0C5 7.386 9.256 3 14.295 3h5.4c5.126 0 9.295 4.234 9.295 9.44a1.5 1.5 0 1 0 3 0C31.99 5.58 26.475 0 19.695 0h-5.4z",
  "M14.295 0C7.63 0 2 5.76 2 12.578a1.5 1.5 0 1 0 3 0C5 7.386 9.256 3 14.295 3h5.4c5.126 0 9.295 4.234 9.295 9.44a1.5 1.5 0 1 0 3 0C31.99 5.58 26.475 0 19.695 0h-5.4z",
  "M1.5 4a1.502 1.502 0 0 0 0 3.002h32A1.5 1.5 0 0 0 33.5 4h-32z",
  "M4.5 0A1.5 1.5 0 0 0 3 1.5c0 6.327 5.21 11.475 11.611 11.475h5.055c6.511 0 11.611-4.98 11.611-11.334a1.5 1.5 0 1 0-3 0c0 4.673-3.782 8.334-8.611 8.334h-5.055C9.782 9.975 6 6.25 6 1.5A1.5 1.5 0 0 0 4.5 0z",
  "M2.5 0A1.5 1.5 0 0 0 1 1.5c0 3.714 1.764 7.055 4.56 9.348 2.393 1.962 5.542 3.156 8.987 3.156h6.023c4.029 0 7.653-1.632 10.137-4.218 2.12-2.207 3.41-5.11 3.41-8.286a1.5 1.5 0 0 0-1.5-1.5H2.5z",
];

const interpolators = [
  interpolatePath(paths[0], paths[4]),
  interpolatePath(paths[1], paths[2]),
  interpolatePath(paths[2], paths[3]),
  interpolatePath(paths[3], paths[4]),
];

interface MouthProps {
  x: Value
}

interface MouthState {
  d: string
}

export default class Mouth extends React.PureComponent<MouthProps, MouthState> {
  constructor(props: MouthProps) {
    super(props);
    this.state = {
      d: paths[0],
    };
  }

  interpolate = (x) => {
    const d = interpolators[0](x / (width / 5));
    // this.setState({ d });
  };

  render() {
    const { x } = this.props;
    const { d } = this.state;
    return (
      <Svg width={35} height={15} viewBox="0 0 35 15">
        <Animated.Code>
          {
            () => call([x], ([x]) => this.interpolate(x))
          }
        </Animated.Code>
        <Path {...{ d }} />
      </Svg>
    );
  }
}
