import React, { useCallback, useEffect, useState } from "react";
import { InitialState, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-community/async-storage";

import { Routes } from "./Routes";
import Examples from "./Examples";
import Coinbase from "./Coinbase";
import Duolingo from "./Duolingo";

const NAVIGATION_STATE_KEY = "NAVIGATION_STATE_KEY-38";

const Stack = createStackNavigator<Routes>();
const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Examples"
      component={Examples}
      options={{
        title: "Can it be done in React Native?",
      }}
    />
    <Stack.Screen
      name="Duolingo"
      component={Duolingo}
      options={{
        title: "Duolingo",
      }}
    />
    <Stack.Screen
      name="Coinbase"
      component={Coinbase}
      options={{
        title: "Coinbase",
      }}
    />
  </Stack.Navigator>
);

const App = () => {
  const [isNavigationReady, setIsNavigationReady] = useState(!__DEV__);
  const [initialState, setInitialState] = useState<InitialState | undefined>();
  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(
          NAVIGATION_STATE_KEY
        );
        const state = savedStateString
          ? JSON.parse(savedStateString)
          : undefined;
        setInitialState(state);
      } finally {
        setIsNavigationReady(true);
      }
    };

    if (!isNavigationReady) {
      restoreState();
    }
  }, [isNavigationReady]);
  const onStateChange = useCallback(
    (state) =>
      AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state)),
    []
  );
  if (!isNavigationReady) {
    return null;
  }
  return (
    <NavigationContainer {...{ onStateChange, initialState }}>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;
