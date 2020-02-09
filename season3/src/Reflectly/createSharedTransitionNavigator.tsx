/* eslint-disable @typescript-eslint/interface-name-prefix */
import React, { FC, memo, useEffect } from "react";
import { Animated, StyleSheet, View } from "react-native";
import {
  CreateNavigatorConfig,
  NavigationParams,
  NavigationRoute,
  NavigationRouteConfigMap,
  NavigationScreenProp,
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
import { SharedElementTransition } from "react-native-shared-element";

import { useCallbackOne, useMemoOne } from "use-memo-one";
import {
  SharedTransitionProvider,
  useSharedTransitionState
} from "./SharedTransitionContext";

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export type Navigation = NavigationScreenProp<
  NavigationRoute<NavigationParams>,
  NavigationParams
>;

interface SharedTransitionNavigatorProps {
  navigation: NavigationStackProp;
  descriptors: SceneDescriptorMap;
  screenProps?: unknown;
}

export interface InjectedSharedTransitionNavigatorProps {}

const Screen = memo(
  ({
    Component
  }: {
    Component: FC<InjectedSharedTransitionNavigatorProps>;
  }) => <Component />
);

const SharedTransitionNavigator = ({
  navigation,
  descriptors
}: SharedTransitionNavigatorProps) => {
  const ScreenComp = descriptors[
    navigation.state.routes[navigation.state.routes.length - 1].key
  ].getComponent() as FC<InjectedSharedTransitionNavigatorProps>;
  const position = useMemoOne(() => new Animated.Value(0), []);
  const {
    startNode,
    startAncestor,
    endNode,
    endAncestor
  } = useSharedTransitionState();
  const { isTransitioning } = navigation.state;
  useEffect(() => {
    if (isTransitioning) {
      Animated.timing(position, { duration: 2000, toValue: 1 }).start();
    }
  }, [isTransitioning, position]);
  return (
    <View style={styles.container}>
      <Screen Component={ScreenComp} />
      {isTransitioning && (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: "white"
          }}
        >
          <SharedElementTransition
            start={{
              node: startNode,
              ancestor: startAncestor
            }}
            end={{
              node: endNode,
              ancestor: endAncestor
            }}
            position={position}
            animation="move"
            resize="auto"
            align="auto"
          />
        </View>
      )}
    </View>
  );
};

const SharedTransitionRootNavigator = (
  props: SharedTransitionNavigatorProps
) => (
  <SharedTransitionProvider>
    <SharedTransitionNavigator {...props} />
  </SharedTransitionProvider>
);

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
  return createNavigator(SharedTransitionRootNavigator as any, router, config);
};
