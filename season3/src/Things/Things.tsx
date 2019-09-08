import React from "react";
import { View } from "react-native";

import Content from "./Content";
import ScrollView from "./ScrollView";

export default () => {
  return (
    <ScrollView>
      <Content />
    </ScrollView>
  );
};
