import {
  Canvas,
  fitbox,
  Group,
  Image,
  rect,
  useImage,
} from "@shopify/react-native-skia";
import React from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Button } from "./Button";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Listener } from "./Listener";

const { width, height } = Dimensions.get("window");
const rct = rect(0, 0, width, height);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const background = require("./assets/background.png");

export const Shazam = () => {
  const { top } = useSafeAreaInsets();
  const image = useImage(background);
  if (!image) {
    return null;
  }
  return (
    <Canvas style={{ width, height }}>
      <Image image={image} rect={rct} fit="cover" />
      <Group
        transform={[
          { translateY: top },
          ...fitbox(
            "contain",
            rect(0, 0, 375, 44),
            rect(0, 0, width, (width * 44) / 375)
          ),
        ]}
      >
        <Header />
      </Group>
      <Group
        transform={[
          { translateX: (width - 321) / 2 },
          { translateY: top + (height - (width * 376) / 321) / 2 },
          ...fitbox(
            "contain",
            rect(0, 0, 321, 376),
            rect(0, 0, width, (width * 321) / 376)
          ),
        ]}
      >
        <Button image={image} />
      </Group>
      <Group
        transform={[{ translateX: (width - 120) / 2 }, { translateY: 550 }]}
      >
        <Listener />
      </Group>
      <Group
        transform={[
          { translateY: height - (width * 180) / 375 },
          ...fitbox(
            "contain",
            rect(0, 0, 375, 180),
            rect(0, 0, width, (width * 180) / 375)
          ),
        ]}
      >
        <Footer />
      </Group>
    </Canvas>
  );
};
