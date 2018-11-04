// @flow
import * as _ from "lodash";
import * as React from "react";
import {
  View, StyleSheet, Text,
} from "react-native";

import Separator from "./Separator";

export const ROW_HEIGHT = 100;

type ScaleProps = {
    from: number,
    to: number,
};

export default class Scale extends React.PureComponent<ScaleProps> {
  render() {
    const { from, to } = this.props;
    const range = to - from + 1;
    return (
      <View>
        {
            _.times(range, Number).map((v, index) => {
              const isFirst = index === 0;
              const isLast = index === range - 1;
              return (
                <View style={styles.row} key={v}>
                  <Text style={styles.value}>{`${from + index}`}</Text>

                </View>
              );
            }).reverse()
          }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    height: ROW_HEIGHT,
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  value: {
    color: "white",
    opacity: 0.95,
    fontSize: 20,
  },
});
