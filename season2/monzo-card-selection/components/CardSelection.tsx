import React, { useState, useRef, useMemo } from "react";
import { View, Text, StyleSheet, SafeAreaView } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Animated, {
  Easing,
  Transitioning,
  Transition,
  TransitioningView
} from "react-native-reanimated";
import { bInterpolate, runTiming, max } from "react-native-redash";

import Card, { Card as CardModel, CARD_WIDTH, CARD_HEIGHT } from "./Card";
import CheckIcon from "./CheckIcon";
import Thumbnail from "./Thumbnail";

interface CardSelectionProps {
  cards: [CardModel, CardModel, CardModel];
}

const {
  useCode,
  Clock,
  Value,
  concat,
  block,
  set,
  add,
  multiply,
  cond,
  eq,
  and,
  greaterOrEq,
  interpolate,
  clockRunning,
  neq,
  not,
  Extrapolate,
  call
} = Animated;

const INITIAL_INDEX: number = -1;
const timing = (clock: Animated.Clock) =>
  runTiming(clock, 0, { toValue: 1, duration: 400, easing: Easing.linear });

export default ({ cards }: CardSelectionProps) => {
  const container = useRef<TransitioningView>();
  const [selectedCardState, setSelectCardState] = useState(INITIAL_INDEX);
  const {
    selectedCard,
    nextIndex,
    cardZIndexes,
    cardRotations,
    cardTranslations,
    animation,
    clock,
    translateX,
    firstAnimationIsDone,
    shouldUpdateZIndexes
  } = useMemo(
    () => ({
      selectedCard: new Value(INITIAL_INDEX),
      nextIndex: new Value(INITIAL_INDEX),
      cardZIndexes: cards.map(() => new Value(0)),
      cardRotations: cards.map(() => new Value(0)),
      cardTranslations: cards.map(() => new Value(0)),
      animation: new Value(0),
      clock: new Clock(),
      translateX: new Value(CARD_WIDTH),
      firstAnimationIsDone: new Value(0),
      shouldUpdateZIndexes: new Value(1)
    }),
    [cards]
  );
  const selectCardState = ([index]: readonly number[]) => {
    if (container && container.current) {
      container.current.animateNextTransition();
    }
    setSelectCardState(index);
  };
  const selectCard = (index: number) => {
    if (index !== selectedCardState) {
      nextIndex.setValue(index);
    }
  };
  useCode(
    block([
      cond(and(not(clockRunning(clock)), neq(nextIndex, selectedCard)), [
        set(selectedCard, nextIndex),
        call([selectedCard], selectCardState)
      ]),
      cond(eq(selectedCard, INITIAL_INDEX), [
        set(animation, timing(clock)),
        set(cardRotations[0], bInterpolate(animation, 0, -15)),
        set(cardRotations[1], 0),
        set(cardRotations[2], bInterpolate(animation, 0, 15))
      ]),
      cond(and(neq(selectedCard, INITIAL_INDEX), not(firstAnimationIsDone)), [
        set(animation, timing(clock)),
        set(cardRotations[0], bInterpolate(animation, 0, -7.5)),
        set(cardRotations[1], bInterpolate(animation, 0, 7.5)),
        set(cardRotations[2], bInterpolate(animation, 15, 0)),
        set(translateX, bInterpolate(animation, translateX, 0)),
        cond(not(clockRunning(clock)), set(firstAnimationIsDone, 1))
      ]),
      ...cards.map((_, index) =>
        cond(and(firstAnimationIsDone, eq(selectedCard, index)), [
          set(animation, timing(clock)),
          ...cards
            .map((_c, i) => i)
            .filter((_c, i) => i !== index)
            .map((absoluteIndex, i) =>
              set(
                cardRotations[absoluteIndex],
                bInterpolate(
                  animation,
                  cardRotations[absoluteIndex],
                  7.5 * (i % 2 === 0 ? -1 : 1)
                )
              )
            ),
          set(
            cardRotations[index],
            interpolate(animation, {
              inputRange: [0, 0.5, 1],
              outputRange: [cardRotations[index], 45, 0]
            })
          ),
          set(
            cardTranslations[index],
            interpolate(animation, {
              inputRange: [0, 0.5, 1],
              outputRange: [0, -CARD_HEIGHT * 1.5, 0],
              extrapolate: Extrapolate.CLAMP
            })
          ),
          cond(and(greaterOrEq(animation, 0.5), shouldUpdateZIndexes), [
            set(
              cardZIndexes[index],
              add(cardZIndexes[index], add(max(...cardZIndexes), 10))
            ),
            set(shouldUpdateZIndexes, 0)
          ]),
          cond(not(clockRunning(clock)), set(shouldUpdateZIndexes, 1))
        ])
      )
    ]),
    [cards]
  );
  return (
    <Transitioning.View
      ref={container}
      style={styles.container}
      transition={<Transition.In type="fade" durationMs={100} />}
    >
      <View style={styles.cards}>
        {cards.map((card, index) => {
          const zIndex = cardZIndexes[index];
          const rotateZ = concat(cardRotations[index] as any, "deg" as any);
          const translateY = cardTranslations[index];
          return (
            <Animated.View
              key={card.id}
              style={{
                zIndex,
                elevation: zIndex,
                ...StyleSheet.absoluteFillObject,
                transform: [
                  { translateX: multiply(translateX, -1) },
                  { rotateZ },
                  { translateX },
                  { translateY }
                ]
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
              {selectedCardState === index && <CheckIcon {...{ color }} />}
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
