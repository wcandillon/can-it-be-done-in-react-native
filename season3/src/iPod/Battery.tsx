import React, { useEffect, useState } from "react";
import * as Battery from "expo-battery";
import Svg, { Path, Rect } from "react-native-svg";

export default () => {
  const [level, setLevel] = useState(0);
  useEffect(() => {
    (async () => {
      const currentLevel = await Battery.getBatteryLevelAsync();
      setLevel(currentLevel);
    })();
    const subscription = Battery.addBatteryLevelListener(({ batteryLevel }) =>
      setLevel(batteryLevel)
    );
    return () => subscription.remove();
  }, []);
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Rect x="1" y="6" width={18 * level} height="11" fill="#2ecc71" />
      <Path
        d="M17 6H3a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2zM23 13v-2"
        stroke="#000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
