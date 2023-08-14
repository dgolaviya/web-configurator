import { TOOL_SCOPE_NAME, UDV_USER_FIELD_VALUES } from "../constants/constants";

export const isToolScope = (apiSourceName) =>
  apiSourceName?.toUpperCase() === TOOL_SCOPE_NAME.toUpperCase();
export const isUDVUserFieldValues = (apiSourceName) =>
  apiSourceName?.toUpperCase() === UDV_USER_FIELD_VALUES.toUpperCase();
export const requiredFieldValidations = (data, requiredFields) => {
  const requiredFieldError = [];
  data.forEach((value) => {
    requiredFields.forEach((fieldName) => {
      if (!value[fieldName]) {
        const error = `${fieldName} is required`;
        requiredFieldError.push(error);
      }
    });
  });
  return requiredFieldError;
};

export const getNestedValueFromObject = (keyDef, sourceObject) =>
  keyDef.split(".").reduce((acc, curr) => acc?.[curr], sourceObject);

export const isValidAPIConfiguration = (apiDef) => {
  let isValid = true;
  if (!apiDef?.requestConfig?.url) {
    isValid = false;
  }
  if (!apiDef?.responseConfig?.response?.key) {
    isValid = false;
  }
  return isValid;
};

export const resolveAPIConfiguration = (
  apiConfig,
  apiParamSourceNames,
  dispatchState,
  udvState
) => {
  const finalApiConfig = { ...apiConfig };
  let isAPISourceResolved = true;
  const paramSources = apiParamSourceNames?.split(/,\s*/g) || [];
  const finalDataSource = paramSources.reduce((acc, curr) => {
    if (curr) {
      let lastSelectedRow = {};
      if (isToolScope(curr)) {
        const { selectedRows } = dispatchState;
        lastSelectedRow = selectedRows
          ? selectedRows[selectedRows.length - 1]
          : {};
      } else if (isUDVUserFieldValues(curr)) {
        lastSelectedRow = udvState[UDV_USER_FIELD_VALUES];
      } else {
        const { selectedRows } = udvState[curr] || {};
        lastSelectedRow = selectedRows
          ? selectedRows[selectedRows.length - 1]
          : {};
      }
      return { ...acc, ...lastSelectedRow };
    }
    return acc;
  }, {});
  finalApiConfig.url = finalApiConfig.url.replace(
    /\/:(\w+)\/?/g,
    (...matchInfo) => {
      const urlParamValue = finalDataSource[matchInfo[1]];
      if (!urlParamValue) {
        isAPISourceResolved = false;
      }
      const retrunValue = urlParamValue
        ? matchInfo[0].replace(`:${matchInfo[1]}`, urlParamValue)
        : matchInfo[0];
      return retrunValue;
    }
  );
  let data = {};
  if (finalApiConfig.data) {
    data = { ...finalApiConfig.data };
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (typeof value === "string" && value.startsWith(":")) {
        const fieldName = value.substring(1);
        data[key] =
          finalDataSource[fieldName] ||
          (typeof finalDataSource[fieldName] === "boolean"
            ? finalDataSource[fieldName]
            : value);
        if (data[key]?.startsWith(":")) {
          isAPISourceResolved = false;
        }
      }
    });
  }
  return { ...finalApiConfig, data, isAPISourceResolved };
};

export const reorderArray = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};
export default null;
