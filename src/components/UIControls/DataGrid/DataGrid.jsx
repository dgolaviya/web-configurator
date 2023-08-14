import React, { useRef, useMemo, useCallback } from "react";
import { useNode } from "@craftjs/core";
import styled from "styled-components";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { useUDVContext, udvReducer } from "../../../common/context";
import { RE_EXECUTE_API_SOURCE } from "../../../common/constants/constants";
import { Emitter } from "../../../common/utils";
import JSONEditorTool from "../../JSONEditorTool";

const DataGridToolbarSettings = () => {
  const {
    actions: { setProp },
    apiSourceName,
    columnDefs,
    width,
    height,
  } = useNode((node) => ({
    apiSourceName: node.data.props.apiSourceName,
    width: node.data.props.width,
    height: node.data.props.height,
    columnDefs: node.data.props.columnDefs,
  }));

  const onAPISourceNameChange = (e) => {
    setProp((prop) => (prop.apiSourceName = e.target.value));
  };

  const onWidthChange = (e) => {
    setProp((prop) => (prop.width = e.target.value));
  };

  const onHeightChange = (e) => {
    setProp((prop) => (prop.height = e.target.value));
  };

  const onColumnDefsChange = (event) => {
    if (event.text) {
      try {
        setProp((prop) => (prop.columnDefs = JSON.parse(event.text)));
      } catch (error) {
        console.log(error?.message);
      }
    } else {
      setProp((prop) => (prop.columnDefs = event.json));
    }
  };

  return (
    <div>
      <div className="pb-5 px-5">
        <div>API Source Name</div>
        <input
          type="text"
          value={apiSourceName}
          placeholder="API Source Name"
          onChange={onAPISourceNameChange}
        />
      </div>
      <div className="pb-5 px-5">
        <div>Grid Width</div>
        <input
          type="text"
          value={width}
          placeholder="Grid Width"
          onChange={onWidthChange}
        />
      </div>
      <div className="pb-5 px-5">
        <div>Grid Height</div>
        <input
          type="text"
          value={height}
          placeholder="Grid Height"
          onChange={onHeightChange}
        />
      </div>
      <div className="pb-5 px-5">
        <div>Column Configuration</div>
        <JSONEditorTool
          onChange={onColumnDefsChange}
          content={{ json: columnDefs }}
        />
      </div>
    </div>
  );
};

const StyledDataGrid = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  box-sizing: border-box;
`;

const DataGrid = ({ apiSourceName, columnDefs, width, height }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  const gridRef = useRef();
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const { state: udvState, dispatch } = useUDVContext();
  const rowData = udvState[apiSourceName]?.rowData;

  const onSelectionChanged = useCallback(() => {
    const selectedRows = gridRef.current.api.getSelectedRows();
    const payload = {
      selectedRows,
      apiSourceName,
    };
    dispatch({ type: udvReducer.UPDATE_SOURCE_SELECTED_ROWS, payload });
    Emitter.emit(RE_EXECUTE_API_SOURCE, payload);
  }, []);

  return (
    <StyledDataGrid
      width={width}
      height={height}
      ref={(ref) => connect(drag(ref))}
    >
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
          onSelectionChanged={onSelectionChanged}
          // onSortChanged={onSortChanged}
          animateRows
        />
      </div>
    </StyledDataGrid>
  );
};

DataGrid.craft = {
  props: {
    apiSourceName: "",
    columnDefs: [],
    width: "300px",
    height: "300px",
  },
  related: {
    toolbar: DataGridToolbarSettings,
  },
};

export default DataGrid;
