/* eslint-disable max-len */
import * as React from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import { Status } from "./Model";
import Eye from "./Eye";
import Mouth from "./Mouth";

const { width } = Dimensions.get("window");
const radius = width / 10 - 8;
interface StatusProps {
  status: Status
}

export default class StatusLabel extends React.PureComponent<StatusProps> {
  render() {
    const { status } = this.props;
    return (
      <View style={styles.face}>
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
    );
  }
}

const styles = StyleSheet.create({
  face: {
    width: radius * 2,
    height: radius * 2,
    borderRadius: radius,
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
