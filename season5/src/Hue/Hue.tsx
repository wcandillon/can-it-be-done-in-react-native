/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-var-requires */
import {
  Canvas,
  runTiming,
  Skia,
  useFont,
  useTouchHandler,
  useValue,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";

import { Background } from "./Background";
import { Room } from "./Room";
const { width, height } = Dimensions.get("window");

const couch = Skia.Path.MakeFromSVGString(
  "M24 3C22.1362 3 20.5701 4.27477 20.126 6H5.87398C5.42994 4.27477 3.86384 3 2 3V2C2 0.89543 2.89543 0 4 0H22C23.1046 0 24 0.89543 24 2V3ZM23 13V14C23 15.1046 22.1046 16 21 16C19.8954 16 19 15.1046 19 14V13H7V14C7 15.1046 6.10457 16 5 16C3.89543 16 3 15.1046 3 14V13H2C0.89543 13 0 12.1046 0 11V7C0 5.89543 0.89543 5 2 5C3.10457 5 4 5.89543 4 7V8H6H20H22V7C22 5.89543 22.8954 5 24 5C25.1046 5 26 5.89543 26 7V11C26 12.1046 25.1046 13 24 13H23Z"
)!;

export const Hue = () => {
  const active = useValue(0);
  const boldFont = useFont(require("./assets/Centrale-Sans-Bold.otf"), 15);
  const font = useFont(require("./assets/Centrale-Sans-Regular.otf"), 13);
  const onTouch = useTouchHandler({
    onStart: () => {
      active.current = 0;
      runTiming(active, 1, { duration: 300 });
    },
    onEnd: () => {
      active.current = 1;
      runTiming(active, 0, { duration: 300 });
    },
  });
  if (!boldFont || !font) {
    return null;
  }
  return (
    <Canvas style={{ width, height }} onTouch={onTouch}>
      <Background>
        <Room
          colors={["#54A5E4", "#3325AE"]}
          name="Room Name"
          boldFont={boldFont}
          font={font}
          icon={couch}
          active={active}
        />
      </Background>
    </Canvas>
  );
};
