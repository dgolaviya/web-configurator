import React from "react";
import DispatchView from "./DispatchView";
import { DispatchProvider, UDVProvider } from "../../common/context";

const GridViewApp = ({ dispatchConfiguration }) => (
  <DispatchProvider dispatchConfiguration={dispatchConfiguration}>
    <UDVProvider>
      <DispatchView />
    </UDVProvider>
  </DispatchProvider>
);

export default GridViewApp;
