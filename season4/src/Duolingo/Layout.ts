import { move } from "react-native-redash";

import { SharedValues } from "../components/AnimatedHelpers";

export type Offset = SharedValues<{
  order: number;
  width: number;
  height: number;
  x: number;
  y: number;
  originalX: number;
  originalY: number;
}>;

const sortByOrder = (a: Offset, b: Offset) => {
  "worklet";
  return a.order.value > b.order.value ? 1 : -1;
};

export const reorder = (rawOffsets: Offset[], from: number, to: number) => {
  "worklet";
  const offsets = rawOffsets
    .filter((offset) => offset.order.value !== -1)
    .sort(sortByOrder);
  const newOffsets = move(offsets, from, to);
  newOffsets.map((o, i) => (o.order.value = i));
};

export const lastOrder = (rawOffsets: Offset[]) => {
  "worklet";
  return rawOffsets.filter((offset) => offset.order.value !== -1).length;
};

export const calculateLayout = (
  rawOffsets: Offset[],
  containerWidth: number
) => {
  "worklet";
  const offsets = rawOffsets
    .filter((offset) => offset.order.value !== -1)
    .sort(sortByOrder);
  if (offsets.length === 0) {
    return;
  }
  const height = offsets[0].height.value;
  let vIndex = 0;
  let lastBreak = 0;
  offsets.forEach((offset, index) => {
    const total = offsets
      .slice(lastBreak, index)
      .reduce((acc, o) => acc + o.width.value, 0);
    if (total + offset.width.value > containerWidth) {
      offset.x.value = 0;
      vIndex++;
      lastBreak = index;
    } else {
      offset.x.value = total;
    }
    offset.y.value = vIndex * height;
  });
};
