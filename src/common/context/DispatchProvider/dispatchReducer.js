export const LOAD_GRID_DATA = "LOAD_GRID_DATA";
export const LOAD_DISPATCH_CONFIG = "LOAD_DISPATCH_CONFIG";
export const CLEAR_GRID_DATA = "CLEAR_GRID_DATA";
export const UPDATE_SELECTED_ROWS = "UPDATE_SELECTED_ROWS";
export const LOAD_GRID_DATA_PENDING = "LOAD_GRID_DATA_PENDING";
export const LOAD_MORE_GRID_DATA = "LOAD_MORE_GRID_DATA";
export const UPDATE_COLUMN_DEFS = "UPDATE_COLUMN_DEFS";

export const initialState = {
  rowData: [],
  selectedRows: [],
  columnDefs: [],
  apiConfig: {},
  tabDefs: [],
};

const dispatchReducer = (state, { type, payload }) => {
  switch (type) {
    case LOAD_GRID_DATA: {
      const nextState = { ...state };
      const { rowData } = payload;
      nextState.rowData = rowData;
      return nextState;
    }
    case CLEAR_GRID_DATA: {
      const nextState = { ...state };
      nextState.rowData = [];
      nextState.selectedRows = [];
      return nextState;
    }
    case UPDATE_SELECTED_ROWS: {
      const nextState = { ...state };
      const { selectedRows } = payload;
      nextState.selectedRows = selectedRows;
      return nextState;
    }
    case UPDATE_COLUMN_DEFS: {
      const nextState = { ...state };
      const { columnDefs } = payload;
      nextState.columnDefs = columnDefs;
      return nextState;
    }
    case LOAD_DISPATCH_CONFIG: {
      return { ...state, ...payload };
    }
    default:
      return state;
  }
};

export default dispatchReducer;
