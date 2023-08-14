import React, { createContext, useContext, useMemo, useReducer } from "react";
import uiManagerReducer, { initialState } from "./uiManagerReducer";

export const UIManagerContext = createContext(null);

const UIManagerProvider = ({ children }) => {
  const [uiManagerState, dispatch] = useReducer(uiManagerReducer, initialState);
  const providerValue = useMemo(
    () => ({ state: uiManagerState, dispatch }),
    [uiManagerState]
  );
  return (
    <UIManagerContext.Provider value={providerValue}>
      {children}
    </UIManagerContext.Provider>
  );
};

export const useUIManagerContext = () => {
  const context = useContext(UIManagerContext);
  if (!context) {
    throw new Error(
      "useUIManagerContext must be used within a UIManagerProvider"
    );
  }
  return context;
};

export default UIManagerProvider;
