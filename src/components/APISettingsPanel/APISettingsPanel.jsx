import React, { useState } from "react";
import DisplayErrors from "../DisplayErrors";
import { useUIManagerContext, uiManagerReducer } from "../../common/context";
import { requiredFieldValidations } from "../../common/utils/functions";
import JSONEditorTool from "../JSONEditorTool";

import "./styles.scss";

const APISettingsPanel = (props) => {
  const { selectedDispatchInfo, toolInstanceId, toolId } = props;
  const { dispatchGroupItem } = selectedDispatchInfo;
  const { apiConfig } = dispatchGroupItem;
  const { dispatch } = useUIManagerContext();
  const [apiDef, setApiDef] = useState(apiConfig);
  const [errors, setErrors] = useState([]);

  const onChangeAPIConfig = (event) => {
    if (event.text) {
      try {
        setApiDef(JSON.parse(event.text));
      } catch (error) {
        console.log(error?.message);
      }
    } else {
      setApiDef(event.json);
    }
  };
  const isAPIConfigValid = () => {
    let isValid = true;
    const filedRequiredErrors = requiredFieldValidations(
      [
        {
          ...apiDef.requestConfig,
          ...apiDef.responseConfig.response,
        },
      ],
      ["url", "key"]
    );
    if (filedRequiredErrors.length > 0) {
      setErrors([...filedRequiredErrors]);
      isValid = false;
    } else {
      setErrors([]);
      isValid = true;
    }
    return isValid;
  };
  const saveAPIConfig = (e) => {
    e.preventDefault();
    const isValid = isAPIConfigValid();
    if (isValid) {
      const updatedDispatchInfo = { ...selectedDispatchInfo };
      const updatedDispatchGroupItem = {
        ...updatedDispatchInfo.dispatchGroupItem,
      };
      updatedDispatchGroupItem.apiConfig = apiDef;
      updatedDispatchInfo.dispatchGroupItem = updatedDispatchGroupItem;
      const payload = {
        toolInstanceId,
        toolId,
        selectedDispatchInfo: updatedDispatchInfo,
      };
      dispatch({ type: uiManagerReducer.UPDATE_GRID_API_CONFIG, payload });
    }
  };
  return (
    <div className="api-settings-panel-container">
      <div className="header">API Settings</div>
      {errors.length > 0 && <DisplayErrors errors={errors} />}
      <div className="panel-body">
        <form onSubmit={saveAPIConfig}>
          <div className="form-control-row">
            <button className="save-button mb-10" type="submit">
              Save API
            </button>
          </div>
          <JSONEditorTool
            onChange={onChangeAPIConfig}
            content={{ json: apiDef }}
          />
        </form>
      </div>
    </div>
  );
};

export default APISettingsPanel;
