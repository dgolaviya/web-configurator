import React, { useState, useEffect } from "react";
import axios from "../../../common/api/axios";

import { useNode } from "@craftjs/core";
import JSONEditorTool from "../../JSONEditorTool";
import {
  useUDVContext,
  udvReducer,
  useDispatchContext,
} from "../../../common/context";
import {
  TOOL_SCOPE_NAME,
  RE_EXECUTE_API_SOURCE,
} from "../../../common/constants/constants";
import {
  Emitter,
  resolveAPIConfiguration,
  isValidAPIConfiguration,
  getNestedValueFromObject,
} from "../../../common/utils";

const APISourceToolbarSettings = () => {
  const {
    actions: { setProp },
    apiSourceName,
    apiParamSourceNames,
    apiConfig,
  } = useNode((node) => ({
    apiSourceName: node.data.props.apiSourceName,
    apiParamSourceNames: node.data.props.apiParamSourceNames,
    apiConfig: node.data.props.apiConfig,
  }));

  const [apiDef, setApiDef] = useState(apiConfig);
  const [apiSource, setApiSource] = useState(apiSourceName);
  const [apiParamSource, setApiParamSource] = useState(apiParamSourceNames);

  const onAPISourceNameChange = (event) => {
    setApiSource(event.target.value);
  };

  const onAPIParamSourceNamesChange = (event) => {
    setApiParamSource(event.target.value);
  };

  const onAPIConfigChange = (event) => {
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

  const saveAPIConfig = (e) => {
    e.preventDefault();
    // const isValid = isAPIConfigValid();
    // if (isValid) {
    // const payload = {
    //   apiConfig: apiDef,
    //   apiSourceName: apiSource,
    //   apiParamSourceNames: apiParamSource,
    // };
    setProp((prop) => (prop.apiSourceName = apiSource));
    setProp((prop) => (prop.apiParamSourceNames = apiParamSource));
    setProp((prop) => (prop.apiConfig = apiDef));
    // }
  };

  return (
    <div>
      <div className="pb-5 px-5">
        <button className="save-button" onClick={saveAPIConfig}>
          Save API
        </button>
        <div>API Source Name</div>
        <input
          type="text"
          value={apiSource}
          placeholder="Text"
          onChange={onAPISourceNameChange}
        />
      </div>
      <div className="pb-5 px-5">
        <div>API Param Source Names</div>
        <input
          type="text"
          value={apiParamSource}
          placeholder="Text"
          onChange={onAPIParamSourceNamesChange}
        />
      </div>
      <div className="pb-5 px-5">
        <div>API Configuration</div>
        <JSONEditorTool
          onChange={onAPIConfigChange}
          content={{ json: apiDef }}
        />
      </div>
    </div>
  );
};

const APISource = ({ apiSourceName, apiParamSourceNames, apiConfig }) => {
  const node = useNode();
  const {
    connectors: { connect, drag },
  } = node;
  const { state: udvState, dispatch } = useUDVContext();
  const { state: dispatchState } = useDispatchContext();
  const [isAPISourceInitialized, setIsAPISourceInitialized] = useState(false);
  const [toggleRefreshGrid, setToggleRefreshGrid] = useState(false);
  const executeAPISource = async () => {
    const { isAPISourceResolved, ...resolvedApiConfig } =
      resolveAPIConfiguration(
        apiConfig.requestConfig,
        apiParamSourceNames,
        dispatchState,
        udvState
      );
    if (isAPISourceResolved) {
      const response = await axios(resolvedApiConfig);
      const {
        response: { key },
      } = apiConfig.responseConfig;
      const data = getNestedValueFromObject(key, response.data);
      const payload = {
        rowData: data,
        apiSourceName,
      };
      dispatch({ type: udvReducer.EXECUTED_API_SOURCE, payload });
    }
  };

  useEffect(() => {
    if (apiSourceName) {
      dispatch({
        type: udvReducer.UPDATE_API_SOURCE_NAME,
        payload: apiSourceName,
      });
    }
  }, [apiSourceName]);

  useEffect(() => {
    if (apiParamSourceNames) {
      const payload = {
        apiParamSourceNames,
        apiSourceName,
      };
      dispatch({ type: udvReducer.UPDATE_API_PARAM_SOURCE_NAMES, payload });
    }
  }, [apiParamSourceNames]);

  useEffect(() => {
    if (Object.keys(apiConfig)?.length > 0) {
      const payload = {
        apiConfig,
        apiSourceName,
      };
      dispatch({ type: udvReducer.UPDATE_API_CONFIG, payload });
    }
  }, [apiConfig]);

  useEffect(() => {
    const eventCallbackfn = (payload) => {
      const paramSources = apiParamSourceNames?.split(/,\s*/g) || [];
      if (paramSources.includes(payload.apiSourceName)) {
        setToggleRefreshGrid((prevToggleRefreshGrid) => !prevToggleRefreshGrid);
      }
    };
    Emitter.on(RE_EXECUTE_API_SOURCE, eventCallbackfn);
    return () => {
      Emitter.off(RE_EXECUTE_API_SOURCE, eventCallbackfn);
    };
  }, []);

  useEffect(() => {
    if (
      isValidAPIConfiguration(apiConfig) &&
      apiSourceName &&
      Object.keys(apiConfig)?.length > 0
    ) {
      executeAPISource();
      setIsAPISourceInitialized(true);
    }
    return () => {
      const payload = {
        apiSourceName,
      };
      dispatch({ type: udvReducer.CLEAR_API_SOURCE, payload });
    };
  }, [apiSourceName, apiParamSourceNames, apiConfig, toggleRefreshGrid]);

  useEffect(() => {
    if (
      isAPISourceInitialized &&
      apiParamSourceNames.includes(TOOL_SCOPE_NAME)
    ) {
      const payload = {
        apiSourceName,
      };
      dispatch({ type: udvReducer.CLEAR_API_SOURCE, payload });
      setToggleRefreshGrid((prevToggleRefreshGrid) => !prevToggleRefreshGrid);
    }
  }, [dispatchState?.selectedRows]);

  return <div ref={(ref) => connect(drag(ref))} />;
};

APISource.craft = {
  props: {
    apiSourceName: "",
    apiParamSourceNames: "",
    apiConfig: {},
  },
  related: {
    toolbar: APISourceToolbarSettings,
  },
};

export default APISource;
