import React, {
  Context,
  Dispatch,
  ReactNode,
  createContext,
  useReducer
} from "react";
import { SharedElementNode } from "react-native-shared-element";

interface SharedTransitionState {
  startNode: SharedElementNode | null;
  startAncestor: SharedElementNode | null;
  endNode: SharedElementNode | null;
  endAncestor: SharedElementNode | null;
}

interface SharedTransitionAction {
  key: keyof SharedTransitionState;
  node: ReactNode;
}

const initialState: SharedTransitionState = {
  startNode: null,
  startAncestor: null,
  endNode: null,
  endAncestor: null
};

export const SharedTransitionContext: Context<[
  SharedTransitionState,
  Dispatch<SharedTransitionAction>
  // createContext#0 doesn't seem to exist in the TS definition
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
]> = createContext();

const reducer = (
  state: SharedTransitionState,
  { key, node }: SharedTransitionAction
) => ({
  ...state,
  [key]: node
});

interface SharedTransitionProviderProps {
  children: ReactNode;
}

export const SharedTransitionProvider = ({
  children
}: SharedTransitionProviderProps) => {
  const value = useReducer(reducer, initialState);
  return (
    <SharedTransitionContext.Provider {...{ value }}>
      {children}
    </SharedTransitionContext.Provider>
  );
};
