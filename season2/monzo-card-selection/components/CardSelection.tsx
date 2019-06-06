import * as React from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated from "react-native-reanimated";

import Card, { Card as CardModel } from "./Card";
import CheckIcon from "./CheckIcon";
import Thumbnail from "./Thumbnail";

const { Value } = Animated;

interface CardSelectionProps {
  cards: CardModel[];
}

export default ({ cards }: CardSelectionProps) => {
  const cardZIndexes = cards.map((_, index) => new Value(index));
  const selectedCard: Animated.Value<number> = new Value(-1);
  const selectCard = (index: number) => selectedCard.setValue(index);
  return (
    <View style={styles.container}>
      <View style={styles.cards}>
        {cards.map((card, index) => {
          const zIndex = cardZIndexes[index];
          return (
            <Animated.View key={card.id} style={{ zIndex, elevation: zIndex }}>
              <Card key={card.id} {...{ card }} />
            </Animated.View>
          );
        })}
      </View>
      <SafeAreaView>
        {cards.map(({ id, name, color, thumbnail }, index) => (
          <RectButton key={id} onPress={() => selectCard(index)}>
            <View style={styles.button} accessible>
              <Thumbnail {...{ thumbnail }} />
              <View style={styles.label}>
                <Text>{name}</Text>
              </View>
              <CheckIcon {...{ color }} />
            </View>
          </RectButton>
        ))}
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cards: {
    flex: 1
  },
  button: {
    flexDirection: "row",
    alignItems: "center"
  },
  label: {
    flex: 1
  }
});
