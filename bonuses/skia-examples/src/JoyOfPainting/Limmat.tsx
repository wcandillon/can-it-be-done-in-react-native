import {
  center,
  CornerPathEffect,
  DiscretePathEffect,
  Group,
  Oval,
  Path,
  rect,
  Skia,
} from "@shopify/react-native-skia";
import { useWindowDimensions } from "react-native";

export const Limmat = () => {
  const { height } = useWindowDimensions();

  const path = Skia.Path.Make();
  path.addRect(rect(125, height * 0.5, 200, 600));
  const pivot = center(path.computeTightBounds());
  const m3 = Skia.Matrix();
  m3.translate(pivot.x, pivot.y);
  m3.rotate(-Math.PI / 6);
  m3.translate(-pivot.x, -pivot.y);
  path.transform(m3);

  const limmat = rect(-500, height * 0.6, 1000, 500);
  const clip = Skia.Path.Make();
  clip.addOval(limmat);
  return (
    <>
      <Oval rect={rect(0, height * 0.5, 1000, 500)} color="#1D4D68" />
      <Oval rect={limmat} color="#277A93" />
      <Group clip={clip}>
        <Path path={path} color="#3084A6">
          <CornerPathEffect r={75} />
          <DiscretePathEffect length={50} deviation={75} />
        </Path>
      </Group>
    </>
  );
};
