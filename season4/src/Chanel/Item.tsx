import React from "react";
import { Image, StyleSheet, Dimensions, Alert } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");
export const MIN_HEIGHT = 128;
export const MAX_HEIGHT = height / 2;
const styles = StyleSheet.create({
  container: {
    width,
    height: MIN_HEIGHT,
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

export interface Item {
  title: string;
  subtitle: string;
  picture: number;
}

interface ItemProps {
  index: number;
  y: Animated.SharedValue<number>;
  item: Item;
}

const Item = ({ y, index, item: { title, subtitle, picture } }: ItemProps) => {
  const style = useAnimatedStyle(() => {
    return {
      height: interpolate(
        y.value,
        [(index - 1) * MAX_HEIGHT, index * MAX_HEIGHT],
        [MIN_HEIGHT, MAX_HEIGHT],
        Extrapolate.CLAMP
      ),
      transform: [{ translateY: -y.value }],
    };
  });
  return (
    <TouchableWithoutFeedback onPress={() => Alert.alert("Pressed!")}>
      <Animated.View style={[styles.container, style]}>
        <Image source={picture} style={styles.picture} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default Item;
