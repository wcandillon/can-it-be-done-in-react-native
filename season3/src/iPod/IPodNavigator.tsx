/* eslint-disable @typescript-eslint/interface-name-prefix */
import React, { FC } from "react";
import {
  Dimensions,
  StatusBar as RNStatusBar,
  StyleSheet,
  View
} from "react-native";
import Animated, { Value, interpolate } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  CreateNavigatorConfig,
  NavigationRouteConfigMap,
  NavigationStackRouterConfig,
  StackRouter,
  createNavigator
} from "react-navigation";
import {
  NavigationStackConfig,
  NavigationStackOptions,
  NavigationStackProp,
  SceneDescriptorMap
} from "react-navigation-stack/lib/typescript/types";

import ClickWheel, { Command } from "./ClickWheel";
import StatusBar from "./StatusBar";

const { width } = Dimensions.get("window");
export const SCREEN_SIZE = width - 32;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    padding: 16,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  screen: {
    width: SCREEN_SIZE,
    height: SCREEN_SIZE,
    backgroundColor: "white",
    borderRadius: 16,
    overflow: "hidden"
  },
  content: {
    flex: 1,
    overflow: "hidden"
  },
  clickWheel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export interface InjectedIPodProps {
  y: Animated.Node<number>;
  command: Animated.Node<Command>;
}

interface IPodNavigatorProps {
  navigation: NavigationStackProp;
  descriptors: SceneDescriptorMap;
  screenProps?: unknown;
}

const IPodNavigator = ({ navigation, descriptors }: IPodNavigatorProps) => {
  const Screen = descriptors[
    navigation.state.routes[navigation.state.routes.length - 1].key
  ].getComponent() as FC<InjectedIPodProps>;
  const alpha = new Value(0);
  const command = new Value(Command.UNDETERMINED);
  const y = interpolate(alpha, {
    inputRange: [0, 2 * Math.PI],
    outputRange: [0, SCREEN_SIZE]
  });
  return (
    <SafeAreaView style={styles.container}>
      <RNStatusBar hidden />
      <View style={styles.screen}>
        <StatusBar />
        <View style={styles.content}>
          <Screen {...{ y, command }} />
        </View>
      </View>
      <View style={styles.clickWheel}>
        <ClickWheel {...{ alpha, command }} />
      </View>
    </SafeAreaView>
  );
};

export default (
  routes: NavigationRouteConfigMap<NavigationStackOptions, NavigationStackProp>,
  config: CreateNavigatorConfig<
    NavigationStackConfig,
    NavigationStackRouterConfig,
    NavigationStackOptions,
    NavigationStackProp
  > = {}
) => {
  const router = StackRouter(routes, config);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return createNavigator(IPodNavigator as any, router, config);
};
