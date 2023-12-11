import React, { useState } from "react";
import { useNode } from "@craftjs/core";
import { useUDVContext, udvReducer } from "../../../common/context";

const TextToolbarSettings = () => {
  const {
    actions: { setProp },
    fieldId,
    label,
  } = useNode((node) => ({
    fieldId: node.data.props.fieldId,
    label: node.data.props.label,
  }));

  const [dataFieldId, setDataFieldId] = useState(fieldId);
  const [displayLabel, setDisplayLabel] = useState(label);

  const onChangeDataFieldId = (event) => {
    setDataFieldId(event.target.value);
  };
  const onChangeLabel = (event) => {
    setDisplayLabel(event.target.value);
  };

  const onSaveTextSettings = () => {
    setProp((prop) => (prop.fieldId = dataFieldId));
    setProp((prop) => (prop.label = displayLabel));
  };

  return (
    <div>
      <button className="save-button" onClick={onSaveTextSettings}>
        Save
      </button>
      <div className="pb-5 px-5">
        <div>Data Field Id</div>
        <input
          type="text"
          value={dataFieldId}
          placeholder="Text"
          onChange={onChangeDataFieldId}
        />
      </div>
      <div className="pb-5 px-5">
        <div>Display Label</div>
        <input
          type="text"
          value={displayLabel}
          placeholder="Text"
          onChange={onChangeLabel}
        />
      </div>
    </div>
  );
};

const Text = ({ fieldId, label }) => {
  const { state: udvState, dispatch } = useUDVContext();
  const {
    connectors: { connect, drag },
  } = useNode();

  const onTextChange = (e) => {
    const payload = {
      fieldId,
      value: e.target.value,
    };
    dispatch({ type: udvReducer.UPDATE_UDV_FIELD_VALUES, payload });
  };

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <div>{label}</div>
      <input type="text" onChange={onTextChange} />
    </div>
  );
};

Text.craft = {
  props: {
    fieldId: "",
    label: "",
  },
  related: {
    toolbar: TextToolbarSettings,
  },
};

export default Text;
