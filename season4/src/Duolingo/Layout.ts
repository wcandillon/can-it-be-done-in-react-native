import { SharedValues } from "../components/AnimatedHelpers";

// TODO: since width/height are stable should they be of type Ref?
export type Offset = SharedValues<{
  order: number;
  id: string;
  width: number;
  height: number;
  x: number;
  y: number;
}>;

export const print = (offsets: Offset[]) => {
  "worklet";
  console.log(offsets.map((o) => o.id.value).join(" "));
};

export const reorder = (offsets: Offset[], from: number, to: number) => {
  "worklet";
  const newOffsets: Offset[] = [];
  const offsetToInsert = offsets[from];
  offsets.forEach((offset, i) => {
    if (i === from) {
      return;
    } else if (i === to) {
      newOffsets.push(offsetToInsert);
    }
    newOffsets.push(offset);
  });
  newOffsets.forEach((o, i) => (o.order.value = i));
};

export const calculateLayout = (offsets: Offset[], containerWidth: number) => {
  "worklet";
  offsets.sort((a, b) => (a.order.value > b.order.value ? 1 : -1));
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
