import React, {
  createContext,
  useContext,
  useMemo,
  useReducer,
  useEffect,
} from "react";
import dispatchReducer, {
  initialState,
  LOAD_DISPATCH_CONFIG,
} from "./dispatchReducer";

export const DispatchContext = createContext(null);

const DispatchProvider = ({ children, dispatchConfiguration }) => {
  const [dispatchState, dispatch] = useReducer(dispatchReducer, initialState);

  useEffect(() => {
    if (dispatchConfiguration) {
      const payload = {
        ...dispatchConfiguration?.dispatchGroupItem,
        ...dispatchConfiguration?.dispatchGroup,
      };
      dispatch({ type: LOAD_DISPATCH_CONFIG, payload });
    }
  }, [dispatchConfiguration]);

  const providerValue = useMemo(
    () => ({ state: dispatchState, dispatch }),
    [dispatchState]
  );
  return (
    <DispatchContext.Provider value={providerValue}>
      {children}
    </DispatchContext.Provider>
  );
};

export const useDispatchContext = () => {
  const context = useContext(DispatchContext);
  if (!context) {
    throw new Error(
      "useDispatchContext must be used within a DispatchProvider"
    );
  }
  return context;
};

export default DispatchProvider;
