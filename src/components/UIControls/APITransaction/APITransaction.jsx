import React from "react";
import { useNode } from "@craftjs/core";

const APISourceToolbarSettings = () => {};

const APITransaction = () => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div
      className="api-transaction-container"
      ref={(ref) => connect(drag(ref))}
    >
      <button>Ok</button>
      <button>Cancel</button>
    </div>
  );
};

APITransaction.craft = {
  props: {
    apiSourceName: "",
    apiParamSourceNames: "",
    apiConfig: {},
  },
  related: {
    toolbar: APISourceToolbarSettings,
  },
};

export default APITransaction;
