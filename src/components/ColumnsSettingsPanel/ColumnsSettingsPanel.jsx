import React, { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useUIManagerContext, uiManagerReducer } from "../../common/context";
import { requiredFieldValidations, reorderArray } from "../../common/utils";
import ColumnRow from "./ColumnRow";
import JSONEditorTool from "../JSONEditorTool";
import DisplayErrors from "../DisplayErrors";
import "./styles.scss";

const ColumnsSettingsPanel = (props) => {
  const { selectedDispatchInfo, toolInstanceId, toolId } = props;
  const { dispatchGroupItem } = selectedDispatchInfo;
  const { columnDefs } = dispatchGroupItem;
  const [columnsConfig, setColumnsConfig] = useState(columnDefs);
  const [errors, setErrors] = useState([]);
  const { dispatch } = useUIManagerContext();

  const onChangeColumnsConfig = useCallback((event) => {
    if (event.text) {
      try {
        setColumnsConfig(JSON.parse(event.text));
      } catch (error) {
        console.log(error?.message);
      }
    } else {
      setColumnsConfig(event.json);
    }
  }, []);

  const isColumnDefsValid = useCallback(() => {
    let isValid = true;
    const requiredErrors = requiredFieldValidations(columnsConfig, [
      "field",
      "headerName",
    ]);
    if (requiredErrors.length > 0) {
      isValid = false;
      setErrors([...requiredErrors]);
    } else {
      setErrors([]);
    }
    // TODO User input validation to be performed here.
    return isValid;
  }, [columnsConfig, errors]);

  const onUpdateColumnsConfig = useCallback(
    (payload) => {
      const updatedColumnConfigs = columnsConfig.map((columnConfig) => {
        if (columnConfig.field === payload.field) {
          return { ...columnConfig, ...payload };
        }
        return columnConfig;
      });
      setColumnsConfig(updatedColumnConfigs);
    },
    [columnsConfig]
  );

  const saveColumnDefs = useCallback(
    (e) => {
      e.preventDefault();
      const isValid = isColumnDefsValid();
      if (isValid) {
        const updatedDispatchInfo = { ...selectedDispatchInfo };
        const updatedDispatchGroupItem = {
          ...updatedDispatchInfo.dispatchGroupItem,
        };
        updatedDispatchGroupItem.columnDefs = columnsConfig;
        updatedDispatchInfo.dispatchGroupItem = updatedDispatchGroupItem;
        const payload = {
          toolInstanceId,
          toolId,
          selectedDispatchInfo: updatedDispatchInfo,
        };
        dispatch({ type: uiManagerReducer.UPDATE_COLUMN_SETTINGS, payload });
      }
    },
    [columnsConfig]
  );

  const onDragEnd = useCallback(
    (event) => {
      if (!event.destination) {
        return;
      }
      const newColumnConfig = reorderArray(
        columnsConfig,
        event.source.index,
        event.destination.index
      );
      setColumnsConfig([...newColumnConfig]);
    },
    [columnsConfig]
  );

  return (
    <div className="columns-panel-container">
      <div className="header">Design Mode</div>
      {errors.length > 0 && <DisplayErrors errors={errors} />}

      <div className="panel-body">
        <form onSubmit={saveColumnDefs}>
          <button className="save-button" type="submit">
            Save Columns
          </button>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    background: snapshot.isDraggingOver
                      ? "WhiteSmoke"
                      : "transparent",
                  }}
                >
                  {columnsConfig?.map((columnDef, index) => (
                    <Draggable
                      key={columnDef.field}
                      draggableId={columnDef.field || "draggableId"}
                      index={index}
                    >
                      {(draggableProvide) => (
                        <div
                          ref={draggableProvide.innerRef}
                          style={draggableProvide.draggableProps.style}
                          {...draggableProvide.draggableProps}
                          {...draggableProvide.dragHandleProps}
                        >
                          <ColumnRow
                            onChange={onUpdateColumnsConfig}
                            key={columnDef.field}
                            {...columnDef}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <JSONEditorTool
            onChange={onChangeColumnsConfig}
            content={{ json: columnsConfig }}
          />
        </form>
      </div>
    </div>
  );
};

export default ColumnsSettingsPanel;
