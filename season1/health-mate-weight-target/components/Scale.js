// @flow
import * as _ from "lodash";
import * as React from "react";
import {
  View, StyleSheet, Text,
} from "react-native";

import Separator from "./Separator";

export const ROW_HEIGHT = 100;
const separators = {
  18: "Underweight",
  19: "Healthy weight",
  24: "Healthy weight",
  25: "Overweight",
  29: "Overweight",
  30: "Obsese",
};

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
              const BMI = from + index;
              const label = separators[BMI];
              const opening = !!separators[BMI - 1];
              return (
                <React.Fragment key={v}>
                  <View style={styles.row}>
                    <Text style={styles.value}>{`${BMI}`}</Text>
                    {
                    label && (
                    <Text style={[styles.label, { alignSelf: opening ? "flex-end" : "flex-start" }]}>{label}</Text>
                    )
                  }
                  </View>
                  {
                    (opening && label) && (
                    <Separator />
                    )
                  }
                </React.Fragment>
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
  label: {
    color: "white",
    opacity: 0.8,
    fontSize: 16,
  },
});
