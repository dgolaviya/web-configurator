import React, { useState, useCallback } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useUIManagerContext, uiManagerReducer } from "../../common/context";
import JSONEditorTool from "../JSONEditorTool";
import TabItemRow from "./TabItemRow";
import "./styles.scss";
import DisplayErrors from "../DisplayErrors";
import { reorderArray, requiredFieldValidations } from "../../common/utils";

const TabSettingsPanel = ({ selectedDispatchInfo, toolInstanceId, toolId }) => {
  const { dispatch } = useUIManagerContext();
  const { dispatchGroupItem } = selectedDispatchInfo;
  const [tabDefsConfig, setTabDefsConfig] = useState(dispatchGroupItem.tabDefs);
  const [errors, setErrors] = useState([]);

  const onChangeTabDefsConfig = useCallback((event) => {
    if (event.text) {
      try {
        setTabDefsConfig(JSON.parse(event.text));
      } catch (error) {
        console.log(error?.message);
      }
    } else {
      setTabDefsConfig(event.json);
    }
  }, []);

  const onDragEnd = useCallback(
    (event) => {
      if (!event.destination) {
        return;
      }
      const newTabDefsConfig = reorderArray(
        tabDefsConfig,
        event.source.index,
        event.destination.index
      );
      setTabDefsConfig([...newTabDefsConfig]);
    },
    [tabDefsConfig]
  );

  const isTabDefsValid = useCallback(() => {
    let isValid = true;
    const requiredErrors = requiredFieldValidations(tabDefsConfig, [
      "id",
      "name",
      "udvId",
    ]);
    if (requiredErrors.length > 0) {
      isValid = false;
      setErrors([...requiredErrors]);
    } else {
      setErrors([]);
    }
    // TODO User input validation to be performed here.
    return isValid;
  }, [tabDefsConfig, errors]);

  const showHideField = useCallback(
    (fieldDetails, index) => {
      const newTabDefsConfig = [...tabDefsConfig];
      newTabDefsConfig[index] = {
        ...newTabDefsConfig[index],
        ...fieldDetails,
      };
      setTabDefsConfig([...newTabDefsConfig]);
    },
    [tabDefsConfig]
  );

  const saveTabDefsSettings = useCallback(
    (e) => {
      e.preventDefault();
      const isValid = isTabDefsValid();
      if (isValid) {
        const updatedDispatchInfo = { ...selectedDispatchInfo };
        const updateddispatchGroupItem = {
          ...updatedDispatchInfo.dispatchGroupItem,
        };
        updateddispatchGroupItem.tabDefs = [...tabDefsConfig];
        updatedDispatchInfo.dispatchGroupItem = updateddispatchGroupItem;
        const payload = {
          toolInstanceId,
          toolId,
          selectedDispatchInfo: updatedDispatchInfo,
        };
        dispatch({ type: uiManagerReducer.UPDATE_TAB_DEFS, payload });
      }
    },
    [tabDefsConfig]
  );

  return (
    <div className="tab-settings-panel">
      <div className="header">Tab Settings</div>
      {errors.length > 0 && <DisplayErrors errors={errors} />}
      <div className="panel-body">
        <div className="tab-settings-save">
          <button type="submit" onClick={saveTabDefsSettings}>
            Save Tab Settings
          </button>
        </div>
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
                {tabDefsConfig.map((el, index) => (
                  <Draggable
                    key={el.id}
                    draggableId={el.id || "draggableId"}
                    index={index}
                  >
                    {(draggableProvide) => (
                      <div
                        ref={draggableProvide.innerRef}
                        style={draggableProvide.draggableProps.style}
                        {...draggableProvide.draggableProps}
                        {...draggableProvide.dragHandleProps}
                      >
                        <TabItemRow
                          key={el.id}
                          {...el}
                          showHideField={showHideField}
                          rowIndex={index}
                          dispatch={dispatch}
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
          content={{ json: tabDefsConfig }}
          onChange={onChangeTabDefsConfig}
        />
      </div>
    </div>
  );
};

export default TabSettingsPanel;
