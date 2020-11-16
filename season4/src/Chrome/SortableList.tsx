import React, { ReactElement, useLayoutEffect } from "react";
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
} from "react-native-reanimated";

import { useSharedValue } from "./Animations";
import { Positions } from "./Config";
import Item from "./Item";

interface ListProps {
  numberOfColumns: number;
  width: number;
  height: number;
  children: ReactElement<{ id: string }>[];
  editing: boolean;
  onDragEnd: (diff: Positions) => void;
}

const List = ({
  numberOfColumns,
  width,
  height,
  children,
  editing,
  onDragEnd,
}: ListProps) => {
  const scrollY = useSharedValue(0);
  const scrollView = useAnimatedRef<Animated.ScrollView>();
  const positions = useSharedValue(
    Object.assign(
      {},
      ...children.map((child, index) => ({ [child.props.id]: index }))
    ) as { [id: number]: number }
  );
  const onScroll = useAnimatedScrollHandler({
    onScroll: ({ contentOffset: { y } }) => {
      scrollY.value = y;
    },
  });
  useLayoutEffect(() => {
    positions.value = Object.assign(
      {},
      ...children.map((child, index) => ({ [child.props.id]: index }))
    );
  }, [children, positions]);
  return (
    <Animated.ScrollView
      scrollEventThrottle={16}
      onScroll={onScroll}
      ref={scrollView}
      contentContainerStyle={{
        height: (Math.ceil(children.length / numberOfColumns) + 1) * height,
        justifyContent: "flex-end",
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
    >
      {children.map((child) => {
        return (
          <Item
            key={child.props.id}
            positions={positions}
            id={child.props.id}
            width={width}
            height={height}
            editing={editing}
            onDragEnd={onDragEnd}
            numberOfColumns={numberOfColumns}
            scrollView={scrollView}
            scrollY={scrollY}
          >
            {child}
          </Item>
        );
      })}
    </Animated.ScrollView>
  );
};

export default List;
