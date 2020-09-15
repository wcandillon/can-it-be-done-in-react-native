import "react-native";

import "react-native-gesture-handler/jestSetup";

const reorder = (input: { order: number }[], from: number, to: number) => {
  input.forEach((p) => {
    if (p.order > to && p.order < from) {
      p.order -= 1;
    }
    if (p.order === from) {
      p.order = to - 1;
    }
  });
};

it("1", () => {
  const words = [
    { order: 1, word: "Ihr" },
    { order: 2, word: "isst" },
    { order: 3, word: "einen" },
    { order: 4, word: "Apfel" },
    { order: 5, word: "," },
    { order: 6, word: "weil" },
    { order: 7, word: "er" },
    { order: 8, word: "hungrig" },
    { order: 9, word: "ist" },
  ];
  reorder(words, 4, 7);
  expect(words[0].order).toBe(1);
  expect(words[1].order).toBe(2);
  expect(words[2].order).toBe(3);
  expect(words[3].order).toBe(6);
  expect(words[4].order).toBe(4);
  expect(words[5].order).toBe(5);
  expect(words[6].order).toBe(7);
  expect(words[7].order).toBe(8);
  expect(words[8].order).toBe(9);
});
