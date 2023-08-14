import { UDV_USER_FIELD_VALUES } from "../../constants/constants";

export const UPDATE_API_CONFIG = "UPDATE_API_CONFIG";
export const UPDATE_UDV_FIELD_VALUES = "UPDATE_UDV_FIELD_VALUES";
export const UPDATE_API_SOURCE_NAME = "UPDATE_API_SOURCE_NAME";
export const UPDATE_API_PARAM_SOURCE_NAMES = "UPDATE_API_PARAM_SOURCE_NAMES";
export const UPDATE_SOURCE_SELECTED_ROWS = "UPDATE_SOURCE_SELECTED_ROWS";
export const CLEAR_API_SOURCE = "CLEAR_API_SOURCE";
export const RE_EXECUTE_DEPENDENT_API_SOURCE =
  "RE_EXECUTE_DEPENDENT_API_SOURCE";
export const EXECUTED_API_SOURCE = "EXECUTED_API_SOURCE";

export const initialState = {
  [UDV_USER_FIELD_VALUES]: {},
};

const udvReducer = (state, { type, payload }) => {
  switch (type) {
    case UPDATE_API_SOURCE_NAME: {
      const nextState = { ...state };
      nextState[payload] = {
        ...nextState[payload],
        apiSourceName: payload,
      };
      return nextState;
    }
    case UPDATE_API_PARAM_SOURCE_NAMES: {
      const nextState = { ...state };
      const { apiSourceName, apiParamSourceNames } = payload;
      nextState[apiSourceName] = {
        ...nextState[apiSourceName],
        apiParamSourceNames,
      };
      return nextState;
    }
    case UPDATE_API_CONFIG: {
      const nextState = { ...state };
      const { apiSourceName, apiConfig } = payload;
      nextState[apiSourceName] = {
        ...nextState[apiSourceName],
        apiConfig,
      };
      return nextState;
    }
    case EXECUTED_API_SOURCE: {
      const nextState = { ...state };
      const { rowData, apiSourceName } = payload;
      nextState[apiSourceName] = {
        ...nextState[apiSourceName],
        rowData,
      };
      return nextState;
    }
    case CLEAR_API_SOURCE: {
      const nextState = { ...state };
      const { apiSourceName } = payload;
      nextState[apiSourceName] = {
        ...nextState[apiSourceName],
        rowData: [],
        selectedRows: [],
      };
      return nextState;
    }
    case UPDATE_SOURCE_SELECTED_ROWS: {
      const nextState = { ...state };
      const { apiSourceName, selectedRows } = payload;
      nextState[apiSourceName] = {
        ...nextState[apiSourceName],
        selectedRows,
      };
      return nextState;
    }
    case UPDATE_UDV_FIELD_VALUES: {
      const nextState = { ...state };
      const { fieldId, value } = payload;
      nextState[UDV_USER_FIELD_VALUES] = {
        ...nextState[UDV_USER_FIELD_VALUES],
        [fieldId]: value,
      };
      return nextState;
    }
    default:
      return state;
  }
};

export default udvReducer;
