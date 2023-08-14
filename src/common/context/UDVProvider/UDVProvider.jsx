import React, { createContext, useContext, useMemo, useReducer } from "react";
import udvReducer, { initialState } from "./udvReducer";

export const UDVContext = createContext(null);

const UDVProvider = ({ children }) => {
  const [udvState, dispatch] = useReducer(udvReducer, initialState);
  const providerValue = useMemo(
    () => ({ state: udvState, dispatch }),
    [udvState]
  );
  return (
    <UDVContext.Provider value={providerValue}>{children}</UDVContext.Provider>
  );
};

export const useUDVContext = () => {
  const context = useContext(UDVContext);
  if (!context) {
    throw new Error("useUDVContext must be used within a UDVProvider");
  }
  return context;
};

export default UDVProvider;
