// @flow
import * as _ from "lodash";
import * as React from "react";
import {
  View, StyleSheet, Text,
} from "react-native";


type SectionProps = {
    label: string,
    from: number,
    to: number,
};

export default class Section extends React.PureComponent<SectionProps> {
  render() {
    const { label, from, to } = this.props;
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
                {
                    (isFirst || isLast) && (
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
    alignItems: "flex-end",
  },
  value: {
    color: "white",
    opacity: 0.95,
    fontSize: 24,
  },
  label: {
    color: "white",
    opacity: 0.8,
    fontSize: 24,
  },
});
