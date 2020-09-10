import React from "react";
import { View } from "react-native";

import Graph from "./Graph";
import data from "./data.json";

const Coinbase = () => {
  return (
    <View>
      <Graph prices={data.prices} />
    </View>
  );
};

export default Coinbase;
