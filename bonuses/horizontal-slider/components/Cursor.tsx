import * as React from "react";
import { StyleSheet, Platform } from "react-native";
import { DangerZone } from "expo";
import { Interactable, ReText } from "react-native-redash";

const { Animated } = DangerZone;
const {
  Value, round, divide, concat, add,
} = Animated;

interface CursorProps {
  x: typeof Value;
  size: number;
  count: number;
}

export default class Cursor extends React.PureComponent<CursorProps> {
  render() {
    const { size, count, x: animatedValueX } = this.props;
    const snapPoints = new Array(count).fill(0).map((e, i) => ({ x: i * size }));
    const index = round(divide(animatedValueX, size));
    return (
      <Interactable style={StyleSheet.absoluteFill} {...{ snapPoints, animatedValueX }} horizontalOnly>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: "white",
            elevation: 5,
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {
            // For an implementation of ReText on android look at
            // https://bit.ly/2DXZFbS
            Platform.OS === "ios" && (
              <ReText style={{ fontSize: 24 }} text={concat(add(index, 1))} />
            )
          }
        </Animated.View>
      </Interactable>
    );
  }
}
