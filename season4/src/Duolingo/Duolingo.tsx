import React from "react";
import { View, StyleSheet } from "react-native";

import WordList from "./WordList";
import Word from "./Word";

const words = [
  { id: 1, word: "Ihr" },
  { id: 2, word: "isst" },
  { id: 3, word: "einen" },
  { id: 4, word: "Apfel" },
  { id: 5, word: "," },
  { id: 6, word: "weil" },
  { id: 7, word: "er" },
  { id: 8, word: "hungrig" },
  { id: 9, word: "ist" },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});

const Duolingo = () => {
  return (
    <View style={styles.container}>
      <WordList>
        {words.map((word) => (
          <Word key={word.id} {...word} />
        ))}
      </WordList>
    </View>
  );
};

export default Duolingo;
