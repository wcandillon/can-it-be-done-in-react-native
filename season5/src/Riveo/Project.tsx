import type { SkFont } from "@shopify/react-native-skia";
import {
  Easing,
  runTiming,
  vec,
  useComputedValue,
  useValue,
  useTouchHandler,
  Canvas,
  Fill,
  ImageShader,
  Rect,
  rect,
  Group,
  Paint,
  RoundedRect,
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
const height = 150;
const project = Skia.RRectXY(Skia.XYWHRect(0, 0, wWidth - 32, height), 0, 0);

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
  const { width } = project.rect;
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
      pointer: pointer.current * PixelRatio.get(),
      origin: origin.current * PixelRatio.get(),
      resolution: vec(width * PixelRatio.get(), height * PixelRatio.get()),
    };
  }, [origin, pointer]);
  if (!image) {
    return null;
  }
  return (
    <Canvas
      style={{
        width: project.rect.width,
        height: project.rect.height,
        marginBottom: 32,
      }}
      onTouch={onTouch}
    >
      <RoundedRect rect={project} color="red" />
      <Group
        transform={[
          { translateX: 290 },
          { translateY: (150 - 24 * 1.5) / 2 },
          { scale: 1.5 },
        ]}
      >
        <Trash />
      </Group>
      <Group transform={[{ scale: 1 / PixelRatio.get() }]}>
        <Group
          clip={project}
          layer={
            <Paint>
              <RuntimeShader source={pageCurl} uniforms={uniforms} />
            </Paint>
          }
          transform={[{ scale: PixelRatio.get() }]}
        >
          <Fill>
            <ImageShader image={image} rect={project.rect} fit="cover" />
          </Fill>
          <Rect rect={rect(0, 120, width, 30)} color={color} />
          <Labels size={size} font={smallFont} duration={duration} />
          <Text x={32} y={height - 40} text={title} color="white" font={font} />
        </Group>
      </Group>
    </Canvas>
  );
};
