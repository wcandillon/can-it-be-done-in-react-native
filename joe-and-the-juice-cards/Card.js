// @flow
import * as React from "react";
import {StyleSheet, View} from "react-native";

export const cardHeight = 250;
export const cardTitle = 45;
export const cardPadding = 10;

type CardProps = {
  name: string,
  color: string,
  price: string
};

export default class Card extends React.Component<CardProps> {

    render(): React.Node {
      const {color} = this.props;
        return (
          <View style={[styles.card, { backgroundColor: color }]} />
        );
    }
}

const styles = StyleSheet.create({
  card: {
    height: cardHeight,
    borderRadius: 10
  }
});
