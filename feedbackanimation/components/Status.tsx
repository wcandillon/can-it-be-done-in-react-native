/* eslint-disable max-len */
import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import { Status } from "./Model";
import Eye from "./Eye";
import Mouth from "./Mouth";

const { width } = Dimensions.get("window");
const radius = width / 10 - 8;
const backgroundColors = {
  terrible: "rgb(244, 199, 164)",
  bad: "rgb(246, 210, 163)",
  ok: "rgb(249, 223, 160)",
  good: "rgb(249, 223, 160)",
  great: "rgb(249, 223, 160)",
};
interface StatusProps {
  status: Status
}

export default class StatusLabel extends React.PureComponent<StatusProps> {
  render() {
    const { status } = this.props;
    const backgroundColor = backgroundColors[status];
    return (
      <View style={styles.faceContainer}>
        <View style={[styles.face, { backgroundColor }]}>
          <View style={styles.eyes}>
            <Eye {...{ status }} />
            <View style={styles.rightEye}>
              <Eye {...{ status }} />
            </View>
          </View>
          <View style={styles.mouth}>
            <Mouth {...{ status }} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  faceContainer: {
    width: width / 5,
    alignItems: "center",
  },
  face: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
    justifyContent: "space-evenly",
  },
  eyes: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  rightEye: {
    transform: [{ rotateY: "180deg" }],
  },
  mouth: {
    justifyContent: "center",
    alignItems: "center",
  },
});
