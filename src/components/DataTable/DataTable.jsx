import React, { useRef, useEffect, useCallback, useMemo } from "react";
import axios from "../../common/api/axios";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import GridSettingPanels from "../GridSettingPanels";
import { useDispatchContext, dispatchReducer } from "../../common/context";

import ColumnFilter from "./ColumnFilter";
import "./styles.scss";

const getNestedValueFromObject = (keyDef, sourceObject) =>
  keyDef.split(".").reduce((acc, curr) => acc?.[curr], sourceObject);

const DataTable = () => {
  const gridRef = useRef();
  const { state: dispatchState, dispatch } = useDispatchContext();
  const { rowData, columnDefs, apiConfig } = dispatchState;
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);

  const isValidAPIConfiguration = useCallback((apiDef) => {
    let isValid = true;
    if (!apiDef?.requestConfig?.url) {
      isValid = false;
    }
    if (!apiDef?.responseConfig?.response?.key) {
      isValid = false;
    }
    return isValid;
  }, []);

  const fetchGridData = async (requestConfig = {}) => {
    const finalRequestConfig = {
      ...apiConfig.requestConfig,
      ...requestConfig,
    };
    const response = await axios(finalRequestConfig);
    const {
      response: { key },
    } = apiConfig.responseConfig;
    const data = getNestedValueFromObject(key, response.data);
    const payload = {
      rowData: data,
    };
    dispatch({ type: dispatchReducer.LOAD_GRID_DATA, payload });
  };

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    const payload = {
      selectedRows,
    };
    dispatch({ type: dispatchReducer.UPDATE_SELECTED_ROWS, payload });
  }, []);

  useEffect(() => {
    if (isValidAPIConfiguration(apiConfig)) {
      fetchGridData();
    }
    return () => {
      dispatch({ type: dispatchReducer.CLEAR_GRID_DATA });
    };
  }, [apiConfig]);

  const defaultColDef = useMemo(() => ({
    comparator: () => 0,
    filter: ColumnFilter,
    filterParams: {
      fetchGridData,
    },
  }));
  const onSortChanged = () => {
    fetchGridData();
  };

  return (
    <div className="grid-container">
      <div className="ag-theme-alpine" style={gridStyle}>
        <AgGridReact
          rowSelection="multiple"
          // rowMultiSelectWithClick
          headerHeight={40}
          rowHeight={30}
          ref={gridRef}
          sideBar
          rowData={rowData}
          columnDefs={columnDefs}
          defaultColDef={defaultColDef}
          onSelectionChanged={onSelectionChanged}
          onSortChanged={onSortChanged}
          animateRows
        />
      </div>
      <GridSettingPanels columnDefs={columnDefs} />
    </div>
  );
};

export default DataTable;
