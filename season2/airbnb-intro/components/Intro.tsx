import * as React from "react";
import { Dimensions, StyleSheet, Animated } from "react-native";
import { Svg } from "expo";
import SVGPath from "art/modes/svg/path";

const { width, height } = Dimensions.get("window");
const { Path } = Svg;
const radius = 75;
const xc = width * 3 / 2;
const yc = height * 3 / 2;
const overlay = SVGPath()
  .moveTo(0, 0)
  .lineTo(width * 3, 0)
  .lineTo(width * 3, height * 3)
  .lineTo(0, height * 3)
  .lineTo(0, 0)
  .close()

  .moveTo(xc - radius, yc)
  .counterArcTo(xc, yc + radius, radius)
  .counterArcTo(xc + radius, yc, radius)
  .counterArcTo(xc, yc - radius, radius)
  .counterArcTo(xc - radius, yc, radius);

interface Step {
  x: number;
  y: number;
  label: string;
}

interface IntroProps {
  steps: Step[];
}

interface IntroState {
  index: number
}

// eslint-disable-next-line react/prefer-stateless-function
export default class Intro extends React.PureComponent<IntroProps, IntroState> {
  state = {
    index: 0,
  };

  nextStep = () => {
    const { index } = this.state;
    this.setState({ index: index + 1 });
  }

  render() {
    const { steps } = this.props;
    const { index } = this.state;
    const step = steps[index];
    return (
      <Animated.View
        style={[styles.container, {
          transform: [
            { translateX: -200 },
            { translateY: -200 },
          ],
        }]}
      >
        <Svg style={StyleSheet.absoluteFill}>
          <Path
            d={overlay.toSVG()}
            fill="#00A699"
            opacity={0.8}
          />
        </Svg>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: -height,
    left: -width,
    width: width * 3,
    height: height * 3,
  },
});
