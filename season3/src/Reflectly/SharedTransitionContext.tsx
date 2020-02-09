import React, {
  Context,
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer
} from "react";
import { SharedElementNode } from "react-native-shared-element";
import { useMemoOne } from "use-memo-one";

export interface SharedTransitionState {
  startNode: SharedElementNode | null;
  startAncestor: SharedElementNode | null;
  endNode: SharedElementNode | null;
  endAncestor: SharedElementNode | null;
}

export interface SharedTransitionAction {
  key: keyof SharedTransitionState;
  node: ReactNode;
}

const initialState: SharedTransitionState = {
  startNode: null,
  startAncestor: null,
  endNode: null,
  endAncestor: null
};

// createContext#0 doesn't seem to exist in the TS definition
// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
const SharedTransitionState: Context<SharedTransitionState> = createContext();

const SharedTransitionDispatch: Context<Dispatch<
  SharedTransitionAction
  // createContext#0 doesn't seem to exist in the TS definition
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
>> = createContext();

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

export const useSharedTransitionState = () => useContext(SharedTransitionState);

export const useSharedTransitionDispatch = () =>
  useContext(SharedTransitionDispatch);

export const SharedTransitionProvider = ({
  children
}: SharedTransitionProviderProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <SharedTransitionDispatch.Provider value={dispatch}>
      <SharedTransitionState.Provider value={state}>
        {children}
      </SharedTransitionState.Provider>
    </SharedTransitionDispatch.Provider>
  );
};
