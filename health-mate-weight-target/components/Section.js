// @flow
import * as _ from "lodash";
import * as React from "react";
import {
  View, StyleSheet, Text,
} from "react-native";

import Separator from "./Separator";

type SectionProps = {
    label: string,
    from: number,
    to: number,
    noTopLabel: boolean,
    noBottomLabel: boolean,
};

export default class Section extends React.PureComponent<SectionProps> {
    static defaultProps = {
      noTopLabel: false,
      noBottomLabel: false,
    };

    render() {
      const {
        label, from, to, noTopLabel, noBottomLabel,
      } = this.props;
      const range = to - from + 1;
      return (
        <View>
          {
            !noTopLabel && (
              <Separator />
            )
          }
          {
            _.times(range, Number).map((v, index) => {
              const isFirst = index === 0;
              const isLast = index === range - 1;
              return (
                <View style={styles.row} key={v}>
                  <Text style={styles.value}>{`${from + index}`}</Text>
                  {
                    ((isFirst && !noBottomLabel) || (isLast && !noTopLabel)) && (
                      <Text style={styles.label}>{label}</Text>
                    )
                  }
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
    height: 100,
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
  label: {
    color: "white",
    opacity: 0.8,
    fontSize: 20,
  },
});
