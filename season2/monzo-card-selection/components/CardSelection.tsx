import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, { Transitioning, Transition } from "react-native-reanimated";

import Card, { Card as CardModel } from "./Card";
import CheckIcon from "./CheckIcon";
import Thumbnail from "./Thumbnail";

const { Value } = Animated;

interface CardSelectionProps {
  cards: CardModel[];
}

export default ({ cards }: CardSelectionProps) => {
  const [selectedCard, setSelectCard] = useState(-1);
  const container = useRef<Transitioning.View>();
  const transition = <Transition.In type="fade" durationMs={100} />;
  const cardZIndexes = cards.map((_, index) => new Value(index));
  const selectCard = (index: number) => {
    container.current.animateNextTransition();
    setSelectCard(index);
  };
  return (
    <Transitioning.View
      ref={container}
      style={styles.container}
      {...{ transition }}
    >
      <View style={styles.cards}>
        {cards.map((card, index) => {
          const zIndex = cardZIndexes[index];
          return (
            <Animated.View
              key={card.id}
              style={{
                zIndex,
                elevation: zIndex,
                ...StyleSheet.absoluteFillObject
              }}
            >
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
              {selectedCard === index && <CheckIcon {...{ color }} />}
            </View>
          </RectButton>
        ))}
      </SafeAreaView>
    </Transitioning.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  cards: {
    flex: 1,
    backgroundColor: "#f4f6f3"
  },
  button: {
    flexDirection: "row"
  },
  label: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#f4f6f3",
    justifyContent: "center"
  }
});
