import React from "react";
import { useNode } from "@craftjs/core";

const TextToolbarSettings = () => {
  const {
    actions: { setProp },
    apiSourceName,
    fieldName,
    isVisible,
  } = useNode((node) => ({
    apiSourceName: node.data.props.apiSourceName,
    fieldName: node.data.props.fieldName,
    isVisible: node.data.props.isVisible,
  }));

  const onAPISourceNameChange = (e) => {
    setProp((prop) => (prop.apiSourceName = e.target.value));
  };

  const onFieldNameChange = (e) => {
    setProp((prop) => (prop.fieldName = e.target.value));
  };

  const onIsVisibleChange = (e) => {
    setProp((prop) => (prop.isVisible = e.target.value));
  };

  return (
    <div>
      <div className="pb-5 px-5">
        <div>API Source Name</div>
        <input
          type="text"
          value={apiSourceName}
          placeholder="Text"
          onChange={onAPISourceNameChange}
        />
      </div>
      <div className="pb-5 px-5">
        <div>Field Name</div>
        <input
          type="text"
          value={fieldName}
          placeholder="Field Name"
          onChange={onFieldNameChange}
        />
      </div>
      <div className="pb-5 px-5">
        <div>isVisible</div>
        <input
          type="text"
          value={isVisible}
          placeholder="IsVisible"
          onChange={onIsVisibleChange}
        />
      </div>
    </div>
  );
};

const Text = ({ apiSourceName, fieldName, isVisible }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <div ref={(ref) => connect(drag(ref))}>
      <h1>
        {apiSourceName}
        {fieldName}
        {isVisible}
      </h1>
    </div>
  );
};

Text.craft = {
  props: {
    apiSourceName: "",
    fieldName: "",
    isVisible: false,
  },
  related: {
    toolbar: TextToolbarSettings,
  },
};

export default Text;
