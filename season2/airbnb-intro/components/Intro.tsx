import * as React from "react";
import {
  Dimensions, StyleSheet, Animated, TouchableWithoutFeedback, View, Text,
} from "react-native";
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
  x = new Animated.Value(0);

  y = new Animated.Value(0);

  state = {
    index: 0,
  };

  nextStep = () => {
    const { steps } = this.props;
    const { index } = this.state;
    if (index + 1 >= steps.length) {
      this.setState({ index: -1 });
    } else {
      this.setState({ index: index + 1 });
    }
  }

  render() {
    const { x, y } = this;
    const { steps } = this.props;
    const { index } = this.state;
    const step = steps[index];
    if (!step) {
      return null;
    }
    return (
      <>
        <Animated.View
          style={[styles.container, {
            transform: [
              { translateX: -width / 2 + x + radius },
              { translateY: -height / 2 + y + radius },
            ],
          }]}
        >
          <Svg style={StyleSheet.absoluteFill}>
            <Path
              d={overlay.toSVG()}
              fill="#00A699"
              opacity={0.85}
            />
          </Svg>
        </Animated.View>

        <View style={styles.content}>
          <TouchableWithoutFeedback onPress={this.nextStep}>
            <View>
              <Text>Next</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </>
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
  content: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
  },
});
