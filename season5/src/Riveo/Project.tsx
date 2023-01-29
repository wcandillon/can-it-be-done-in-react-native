import type { SkFont, SkRuntimeEffect } from "@shopify/react-native-skia";
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
import React, { useEffect, useState } from "react";
import { Dimensions, Image, PixelRatio } from "react-native";

import { Trash } from "./Icons";
import { Labels } from "./Labels";

const { width: wWidth } = Dimensions.get("window");
const project = Skia.RRectXY(Skia.XYWHRect(0, 0, wWidth - 32, 150), 16, 16);

const useShader = (mod: number) => {
  const [rt, setRT] = useState<null | SkRuntimeEffect>(null);
  useEffect(() => {
    const { uri } = Image.resolveAssetSource(pageCurlSrc);
    fetch(uri).then(async (resp) => {
      const data = await resp.text();
      setRT(Skia.RuntimeEffect.Make(data));
    });
  }, [mod]);

  return rt;
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const pageCurlSrc = require("./pageCurl.sksl");

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
  const source = useShader(pageCurlSrc);
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
      resolution: vec(width * PixelRatio.get(), 150 * PixelRatio.get()),
    };
  }, [origin, pointer]);
  if (!image || !source) {
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
              <RuntimeShader source={source} uniforms={uniforms} />
            </Paint>
          }
          transform={[{ scale: PixelRatio.get() }]}
        >
          <Fill>
            <ImageShader image={image} rect={project.rect} fit="cover" />
          </Fill>
          <Rect rect={rect(0, 120, width - 32, 30)} color={color} />
          <Labels size={size} font={smallFont} duration={duration} />
          <Text x={32} y={150 - 40} text={title} color="white" font={font} />
        </Group>
      </Group>
    </Canvas>
  );
};
