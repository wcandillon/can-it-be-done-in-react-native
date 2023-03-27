import {
  center,
  Circle,
  CornerPathEffect,
  DiscretePathEffect,
  DisplacementMap,
  Group,
  Oval,
  Rect,
  rect,
  Skia,
  Turbulence,
  vec,
} from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";

import { Palette } from "./Palette";

export const Limmat = () => {
  const { height, width } = useWindowDimensions();

  const hongg = rect(0, height * 0.5, 1000, 500);
  const limmat = rect(-500, height * 0.6, 1000, 500);
  const undulations = rect(125, height * 0.5, 200, 600);
  const sun = vec(width / 2, height - 300);
  const clip = Skia.Path.Make();
  clip.addOval(limmat);
  return (
    <Group>
      <Oval rect={hongg} color={Palette.limmatquai} />
      <Oval rect={limmat} color={Palette.mysticTeal} />
      <Group clip={clip}>
        <Rect
          rect={undulations}
          color={Palette.alpineAzure}
          transform={[{ rotate: -Math.PI / 12 }]}
          origin={center(undulations)}
        >
          <CornerPathEffect r={75} />
          <DiscretePathEffect length={50} deviation={75} />
        </Rect>
        {/* 
        There is a bug with DisplacementMap on the React Native Skia
        shipped with Expo SDK 48. Update to the latest version of
        React Native Skia to see this effect.
        <Group>
          <Circle color={Palette.sunlightWishper} r={125} c={sun} opacity={0.4}>
            <DisplacementMap channelX="r" channelY="g" scale={50}>
              <Turbulence freqX={0.005} freqY={0.1} octaves={4} />
            </DisplacementMap>
          </Circle>
        </Group> */}
      </Group>
    </Group>
  );
};
