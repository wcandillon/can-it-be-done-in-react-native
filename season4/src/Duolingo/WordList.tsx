import React, { ReactElement } from "react";
import { View } from "react-native";

interface WordListProps {
  children: ReactElement<{ id: number }>[];
}

const WordList = ({ children }: WordListProps) => {
  return <View>{children}</View>;
};

export default WordList;
