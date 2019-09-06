import React from "react";
import { timing } from "react-native-redash";
import CircularProgress from "./CircularProgress";

export default () => {
  return <CircularProgress progress={timing({ duration: 5 * 1000 })} />;
};
