import type { SkFont } from "@shopify/react-native-skia";
import {
  Easing,
  runTiming,
  vec,
  useComputedValue,
  useValue,
  useTouchHandler,
  Canvas,
  ImageShader,
  Rect,
  rect,
  Group,
  Paint,
  RuntimeShader,
  Skia,
  Text,
  useImage,
} from "@shopify/react-native-skia";
import { Dimensions, PixelRatio } from "react-native";

import { Trash } from "./Icons";
import { Labels } from "./Labels";
import { pageCurl } from "./pageCurl";

const { width: wWidth } = Dimensions.get("window");
const pd = PixelRatio.get();
const height = 150;
const outer = Skia.XYWHRect(0, 0, wWidth, height);
const pad = 16;
const inner = Skia.XYWHRect(pad, pad, wWidth - pad * 2, height - pad * 2);
const labelHeight = 25;

export interface Project {
  id: string;
  title: string;
  size: string;
  duration: string;
  picture: number;
  color: string;
}

interface ProjectProps {
  project: Project;
  font: SkFont;
  smallFont: SkFont;
}

export const Project = ({
  font,
  smallFont,
  project: { picture, title, color, size, duration },
}: ProjectProps) => {
  const { width } = outer;
  const image = useImage(picture);
  const origin = useValue(width);
  const pointer = useValue(width);
  const onTouch = useTouchHandler({
    onStart: ({ x }) => {
      origin.current = x;
    },
    onActive: ({ x }) => {
      pointer.current = x;
    },
    onEnd: () => {
      runTiming(pointer, width, {
        duration: 450,
        easing: Easing.inOut(Easing.ease),
      });
      runTiming(origin, width, {
        duration: 450,
        easing: Easing.inOut(Easing.ease),
      });
    },
  });
  const uniforms = useComputedValue(() => {
    return {
      pointer: pointer.current * pd,
      origin: origin.current * pd,
      center: [(outer.width * pd) / 2, (outer.height * pd) / 2],
      container: [
        inner.x,
        inner.y,
        inner.x + inner.width,
        inner.y + inner.height,
      ].map((v) => v * pd),
    };
  }, [origin, pointer]);
  if (!image) {
    return null;
  }
  return (
    <Canvas
      style={{
        width: outer.width,
        height: outer.height,
      }}
      onTouch={onTouch}
    >
      <Rect rect={inner} color="red" />
      <Group
        transform={[
          { translateX: 290 },
          { translateY: (150 - 24 * 1.5) / 2 },
          { scale: 1.5 },
        ]}
      >
        <Trash />
      </Group>
      <Group transform={[{ scale: 1 / pd }]}>
        <Group
          layer={
            <Paint>
              <RuntimeShader source={pageCurl} uniforms={uniforms} />
            </Paint>
          }
          transform={[{ scale: pd }]}
        >
          <Rect rect={inner}>
            <ImageShader image={image} rect={inner} fit="cover" />
          </Rect>
          <Rect
            rect={rect(
              inner.x,
              inner.y + inner.height - labelHeight,
              inner.width,
              labelHeight
            )}
            color={color}
          />
          <Labels size={size} font={smallFont} duration={duration} />
          <Text x={32} y={height - 50} text={title} color="white" font={font} />
        </Group>
      </Group>
    </Canvas>
  );
};
