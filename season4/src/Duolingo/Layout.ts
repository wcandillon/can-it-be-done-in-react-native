import { SharedValues } from "../components/AnimatedHelpers";
const move = (arr: Offset[], old_index: number, new_index: number) => {
  "worklet";
  while (old_index < 0) {
    old_index += arr.length;
  }
  while (new_index < 0) {
    new_index += arr.length;
  }
  if (new_index >= arr.length) {
    let k = new_index - arr.length;
    while (k-- + 1) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};

// TODO: since width/height are stable should they be of type Ref?
export type Offset = SharedValues<{
  order: number;
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
}>;

const sortByOrder = (a: Offset, b: Offset) => {
  "worklet";
  return a.order.value > b.order.value ? 1 : -1;
};

export const print = (offsets: Offset[]) => {
  "worklet";
  console.log(
    offsets
      .slice()
      .sort(sortByOrder)
      .map((o) => `${o.id.value} (${o.order.value})`)
      .join(" ")
  );
};

export const reorder = (rawOffsets: Offset[], from: number, to: number) => {
  "worklet";
  const offsets = rawOffsets.slice().sort(sortByOrder);
  const result = move(offsets, from, to);
  console.log({ result });
  result.forEach((offset, index) => (offset.order.value = index));
};

export const calculateLayout = (
  rawOffsets: Offset[],
  containerWidth: number
) => {
  "worklet";
  const offsets = rawOffsets.slice().sort(sortByOrder);
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
