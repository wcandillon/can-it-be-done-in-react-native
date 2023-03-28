import type { SkRect, Vector } from "@shopify/react-native-skia";
import {
  Canvas,
  Group,
  Vertices,
  ImageShader,
  rect,
  useImage,
  vec,
} from "@shopify/react-native-skia";
import React from "react";
import { createNoise2D } from "simplex-noise";

const aspectRatio = 1030 / 564;
const width = 300;
const height = width * aspectRatio;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const art = require("./assets/art1.jpg");
const numberOfSlices = 10;
const stripeWidth = width / numberOfSlices;
const stripes = new Array(numberOfSlices).fill(0).map((_, i) => i);

interface StripeProps {
  index: number;
}

type Triangle = [Vector, Vector, Vector];

const generateTrianglePointsAndIndices = (
  rct: SkRect,
  triangleNumberWidth: number,
  triangleNumberHeight: number
) => {
  const A = 5;
  const F = 1;
  const noise = createNoise2D();
  const vertices: Vector[] = [];
  const textures: Vector[] = [];
  const indices: number[] = [];

  // Calculate the size of the triangles based on the given numbers
  const triangleWidth = rct.width / triangleNumberWidth;
  const triangleHeight = rct.height / triangleNumberHeight;

  // Generate the list of points
  for (let i = 0; i <= triangleNumberHeight; i++) {
    for (let j = 0; j <= triangleNumberWidth; j++) {
      const point = vec(rct.x + j * triangleWidth, rct.y + i * triangleHeight);
      const d = A * noise(i / triangleNumberHeight, j / triangleNumberWidth);
      textures.push(point);
      vertices.push(vec(point.x + d, point.y + d));
    }
  }

  // Generate the list of triangle indices
  for (let i = 0; i < triangleNumberHeight; i++) {
    for (let j = 0; j < triangleNumberWidth; j++) {
      const topLeftIndex = i * (triangleNumberWidth + 1) + j;
      const topRightIndex = topLeftIndex + 1;
      const bottomLeftIndex = topLeftIndex + triangleNumberWidth + 1;
      const bottomRightIndex = bottomLeftIndex + 1;

      // Create two triangles for each square and add their indices to the list
      indices.push(topLeftIndex, topRightIndex, bottomLeftIndex);
      indices.push(bottomLeftIndex, topRightIndex, bottomRightIndex);
    }
  }

  return { vertices, indices, textures };
};

const Stripe = ({ index }: StripeProps) => {
  const x = index * stripeWidth;
  const rct = rect(x, 0, stripeWidth, height);
  const { vertices, indices, textures } = generateTrianglePointsAndIndices(
    rct,
    1,
    4
  );
  return <Vertices vertices={vertices} textures={textures} indices={indices} />;
};

export const Puzzle2 = () => {
  const image = useImage(art);

  if (!image) {
    return null;
  }
  return (
    <Canvas style={{ flex: 1 }}>
      <Group>
        <ImageShader
          image={image}
          rect={rect(0, 0, width, height)}
          fit="fill"
        />
        {stripes.map((index) => (
          <Stripe key={index} index={index} />
        ))}
      </Group>
    </Canvas>
  );
};
