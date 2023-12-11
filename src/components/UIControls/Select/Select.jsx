import React, { useState, useEffect } from "react";
import axios from "../../../common/api/axios";
import ReactSelect from "react-select";
import { useNode } from "@craftjs/core";
import JSONEditorTool from "../../JSONEditorTool";
import {
  udvReducer,
  useUDVContext,
  useDispatchContext,
} from "../../../common/context";
import {
  TOOL_SCOPE_NAME,
  RE_EXECUTE_SELECT_SOURCE,
} from "../../../common/constants/constants";
import {
  Emitter,
  resolveAPIConfiguration,
  isValidAPIConfiguration,
  getNestedValueFromObject,
} from "../../../common/utils";

const SelectToolbarSettings = () => {
  const {
    actions: { setProp },
    dependentFieldNames,
    apiParamSourceNames,
    apiConfig,
    fieldId,
    label,
    selectOptionLabelMapping,
    selectOptionValueMapping,
  } = useNode((node) => ({
    apiParamSourceNames: node.data.props.apiParamSourceNames,
    dependentFieldNames: node.data.props.dependentFieldNames,
    selectOptionLabelMapping: node.data.props.selectOptionLabelMapping,
    selectOptionValueMapping: node.data.props.selectOptionValueMapping,
    fieldId: node.data.props.fieldId,
    label: node.data.props.label,
    apiConfig: node.data.props.apiConfig,
  }));

  const [apiDef, setApiDef] = useState(apiConfig);
  const [apiParamSource, setApiParamSource] = useState(apiParamSourceNames);
  const [dataFieldId, setDataFieldId] = useState(fieldId);
  const [displayLabel, setDisplayLabel] = useState(label);
  const [dependentFields, setDependentFields] = useState(dependentFieldNames);
  const [optionLabelMapping, setOptionLabelMapping] = useState(
    selectOptionLabelMapping
  );
  const [optionValueMapping, setOptionValueMapping] = useState(
    selectOptionValueMapping
  );

  const onDependentFieldNamesChange = (event) => {
    setDependentFields(event.target.value);
  };

  const onOptionLabelMappingChange = (event) => {
    setOptionLabelMapping(event.target.value);
  };

  const onAPIParamSourceNamesChange = (event) => {
    setApiParamSource(event.target.value);
  };

  const onOptionValueMappingChange = (event) => {
    setOptionValueMapping(event.target.value);
  };

  const onChangeDataFieldId = (event) => {
    setDataFieldId(event.target.value);
  };
  const onChangeLabel = (event) => {
    setDisplayLabel(event.target.value);
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
    setProp((prop) => (prop.fieldId = dataFieldId));
    setProp((prop) => (prop.label = displayLabel));
    setProp((prop) => (prop.dependentFieldNames = dependentFields));
    setProp((prop) => (prop.apiConfig = apiDef));
    setProp((prop) => (prop.apiParamSourceNames = apiParamSource));
    setProp((prop) => (prop.selectOptionLabelMapping = optionLabelMapping));
    setProp((prop) => (prop.selectOptionValueMapping = optionValueMapping));
    // }
  };

  return (
    <div>
      <button className="save-button" onClick={saveAPIConfig}>
        Save API
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
        <div>Dependent Field Names</div>
        <input
          type="text"
          value={dependentFields}
          placeholder="Text"
          onChange={onDependentFieldNamesChange}
        />
      </div>
      <div className="pb-5 px-5">
        <div>Option Label Mapping</div>
        <input
          type="text"
          value={optionLabelMapping}
          placeholder="Text"
          onChange={onOptionLabelMappingChange}
        />
      </div>
      <div className="pb-5 px-5">
        <div>Option Value Mapping</div>
        <input
          type="text"
          value={optionValueMapping}
          placeholder="Text"
          onChange={onOptionValueMappingChange}
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

const Select = ({
  fieldId,
  label,
  dependentFieldNames,
  apiConfig,
  selectOptionLabelMapping,
  selectOptionValueMapping,
  apiParamSourceNames,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const [options, setOptions] = useState([]);
  const [value, setValue] = useState(null);
  const { state: udvState, dispatch } = useUDVContext();
  const [toggleRefreshSelect, setToggleRefreshSelect] = useState(false);
  const [isSelectSourceInitialized, setIsSelectSourceInitialized] =
    useState(false);
  const { state: dispatchState } = useDispatchContext();

  const executeLookupAPI = async () => {
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
      const transformedOptions = data.map((el) => ({
        label: el[selectOptionLabelMapping],
        value: el[selectOptionValueMapping],
      }));
      setOptions(transformedOptions);
    }
  };

  useEffect(() => {
    const eventCallbackfn = (payload) => {
      const fieldNames = payload.dependentFieldNames?.split(/,\s*/g) || [];
      if (fieldNames.includes(fieldId)) {
        setToggleRefreshSelect(
          (prevToggleRefreshSelect) => !prevToggleRefreshSelect
        );
      }
    };
    Emitter.on(RE_EXECUTE_SELECT_SOURCE, eventCallbackfn);
    return () => {
      Emitter.off(RE_EXECUTE_SELECT_SOURCE, eventCallbackfn);
    };
  }, []);

  useEffect(() => {
    console.log(
      apiParamSourceNames,
      apiConfig,
      toggleRefreshSelect,
      "execute select"
    );
    if (
      isValidAPIConfiguration(apiConfig) &&
      Object.keys(apiConfig)?.length > 0
    ) {
      executeLookupAPI();
      setIsSelectSourceInitialized(true);
    }
    return () => {
      setValue(null);
      setOptions([]);
    };
  }, [apiParamSourceNames, apiConfig, toggleRefreshSelect]);

  useEffect(() => {
    if (
      isSelectSourceInitialized &&
      apiParamSourceNames.includes(TOOL_SCOPE_NAME) &&
      dispatchState?.selectedRows?.length > 0
    ) {
      setOptions([]);
      setValue(null);
      setToggleRefreshSelect(
        (prevToggleRefreshSelect) => !prevToggleRefreshSelect
      );
    }
  }, [dispatchState?.selectedRows]);

  const onSelectOptionChange = (selectedOption) => {
    const payload = {
      fieldId,
      dependentFieldNames,
      value: selectedOption.value,
    };
    dispatch({ type: udvReducer.UPDATE_UDV_FIELD_VALUES, payload });
    setValue(selectedOption);
    Emitter.emit(RE_EXECUTE_SELECT_SOURCE, payload);
  };

  return (
    <div ref={(ref) => connect(drag(ref))}>
      <div>{label}</div>
      <ReactSelect
        value={value}
        options={options}
        onChange={onSelectOptionChange}
      />
    </div>
  );
};

Select.craft = {
  props: {
    fieldId: "",
    label: "",
    apiParamSourceNames: "",
    dependentFieldNames: "",
    apiConfig: {},
    selectOptionLabelMapping: "",
    selectOptionValueMapping: "",
  },
  related: {
    toolbar: SelectToolbarSettings,
  },
};

export default Select;
