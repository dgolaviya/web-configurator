import groups from "../../data/dispatchGroups.json";
import dispatchGroupItems from "../../data//dispatches.json";

export const REGISTER_NEW_TOOL_ITEM = "REGISTER_NEW_TOOL_ITEM";
export const LOAD_DISPATCH_GROUPS = "LOAD_DISPATCH_GROUPS";
export const LOAD_DISPATCHES = "LOAD_DISPATCHES";
export const UPDATE_TAB_DEFS = "UPDATE_TAB_DEFS";
export const SELECT_TOOL_ITEM = "SELECT_TOOL_ITEM";
export const SELECT_UDV_ID = "SELECT_UDV_ID";
export const SELECT_DISPATCH_ITEM = "SELECT_DISPATCH_ITEM";
export const UPDATE_COLUMN_SETTINGS = "UPDATE_COLUMN_SETTINGS";
export const UPDATE_GRID_API_CONFIG = "UPDATE_GRID_API_CONFIG";

export const initialState = {
  openedTools: {},
  selectedToolItem: {},
  dispatchGroups: [],
  dispatches: {},
};
const uiManagerReducer = (state, { type, payload }) => {
  switch (type) {
    case REGISTER_NEW_TOOL_ITEM: {
      const nextState = { ...state };
      const { toolId } = payload;
      const toolInstanceId = `${Math.random() * 100 ** 10}${Date.now()}`;
      const updatedOpenedTools = { ...nextState.openedTools };
      updatedOpenedTools[toolId] = updatedOpenedTools[toolId]
        ? [...updatedOpenedTools[toolId], { toolId, toolInstanceId }]
        : [{ toolId, toolInstanceId }];
      nextState.openedTools = updatedOpenedTools;
      return nextState;
    }
    case SELECT_TOOL_ITEM: {
      const nextState = { ...state };
      nextState.selectedToolItem = payload;
      return nextState;
    }
    case SELECT_UDV_ID: {
      const nextState = { ...state };
      const { toolInstanceId, toolId, udvId } = payload;
      const updatedOpenedTools = { ...nextState.openedTools };
      const udvTools = updatedOpenedTools[toolId];
      const updatedUDVTools = udvTools.map((udvTool) => {
        if (udvTool.toolInstanceId === toolInstanceId) {
          return { ...udvTool, udvId };
        }
        return udvTool;
      });
      updatedOpenedTools[toolId] = updatedUDVTools;
      nextState.openedTools = updatedOpenedTools;
      nextState.selectedToolItem = { ...nextState.selectedToolItem, udvId };
      return nextState;
    }
    case SELECT_DISPATCH_ITEM:
    case UPDATE_TAB_DEFS:
    case UPDATE_COLUMN_SETTINGS:
    case UPDATE_GRID_API_CONFIG: {
      const nextState = { ...state };
      const { toolInstanceId, toolId, selectedDispatchInfo } = payload;
      const updatedOpenedTools = { ...nextState.openedTools };
      const dispatchTools = updatedOpenedTools[toolId];
      const updatedDispatchTools = dispatchTools.map((dispatchTool) => {
        if (dispatchTool.toolInstanceId === toolInstanceId) {
          return { ...dispatchTool, selectedDispatchInfo };
        }
        return dispatchTool;
      });
      updatedOpenedTools[toolId] = updatedDispatchTools;
      nextState.openedTools = updatedOpenedTools;
      nextState.selectedToolItem = {
        ...nextState.selectedToolItem,
        selectedDispatchInfo,
      };
      return nextState;
    }
    case LOAD_DISPATCH_GROUPS: {
      const nextState = { ...state };
      nextState.dispatchGroups = groups;
      return nextState;
    }
    case LOAD_DISPATCHES: {
      const nextState = { ...state };
      const dispatches = dispatchGroupItems.reduce((acc, currGroupItem) => {
        if (acc[currGroupItem.groupId]) {
          acc[currGroupItem.groupId].push(currGroupItem);
        } else {
          acc[currGroupItem.groupId] = [currGroupItem];
        }
        return acc;
      }, {});
      nextState.dispatches = dispatches;
      return nextState;
    }
    default:
      return state;
  }
};

export default uiManagerReducer;
