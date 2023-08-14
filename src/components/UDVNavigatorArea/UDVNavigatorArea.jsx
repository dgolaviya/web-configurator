import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useEditor } from "@craftjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import JSONEditorTool from "../JSONEditorTool";
import DialogBox from "../DialogBox";
import MFI_1 from "../../common/data/MFI_1.json";
import MFI_2 from "../../common/data/MFI_2.json";
import MFI_3 from "../../common/data/MFI_3.json";
import { uiManagerReducer, useUIManagerContext } from "../../common/context";
import "./styles.scss";

const UDVOptions = [
  {
    label: "MFI_1",
    value: MFI_1,
  },
  {
    label: "MFI_2",
    value: MFI_2,
  },
  {
    label: "MFI_3",
    value: MFI_3,
  },
];

const UDVNavigatorArea = ({ toolInstanceId, toolId, udvId }) => {
  const { dispatch } = useUIManagerContext();
  const editor = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }));
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [selectedUDV, setSelectedUDV] = useState(null);
  const [udvDef, setUdvDef] = useState(false);
  const onSaveUDVDefinition = () => {
    setUdvDef(editor.query.serialize());
  };
  useEffect(() => {
    const udvDefs = {
      MFI_1,
      MFI_2,
      MFI_3,
    };
    if (udvId) {
      const udv = udvDefs[udvId];
      setSelectedUDV({ label: udvId, value: udv });
      setTimeout(() => {
        editor.actions.deserialize(udv.udvDef);
      }, 500);
    }
  }, [udvId]);

  const onDisplayUDVDefinition = () => {
    setDialogOpen(true);
  };
  const onCloseDialogBox = () => {
    setDialogOpen(false);
  };
  const onUndoChange = () => {
    editor.actions.history.undo();
  };
  const onRedoChange = () => {
    editor.actions.history.redo();
  };
  const onChangeUDV = (selectedUDVOption) => {
    const { value } = selectedUDVOption;
    setSelectedUDV(selectedUDVOption);
    editor.actions.deserialize(value.udvDef);
    const payload = {
      udvId: value.udvId,
      toolInstanceId,
      toolId,
    };
    dispatch({ type: uiManagerReducer.SELECT_UDV_ID, payload });
  };
  return (
    <>
      <div className="udv-navigator-controls p-5">
        <div className="udv-navigator-button">
          <FontAwesomeIcon icon="fa-solid fa-plus" className="fs-16 pr-10" />
        </div>
        <div className="udv-navigator-button" onClick={onSaveUDVDefinition}>
          <FontAwesomeIcon
            icon="fa-solid fa-floppy-disk"
            className="fs-16 pr-10"
          />
        </div>
        <div className="udv-navigator-button" onClick={onDisplayUDVDefinition}>
          <FontAwesomeIcon
            icon="fa-solid fa-download"
            className="fs-16 pr-10"
          />
        </div>
        <div className="udv-navigator-button" onClick={onUndoChange}>
          <FontAwesomeIcon
            icon="fa-solid fa-rotate-left"
            className="fs-16 pr-10"
          />
        </div>
        <div className="udv-navigator-button" onClick={onRedoChange}>
          <FontAwesomeIcon
            icon="fa-solid fa-rotate-right"
            className="fs-16 pr-10"
          />
        </div>
      </div>
      <div className="udv-info pb-5 px-5">
        <Select
          className="udv-select"
          options={UDVOptions}
          value={selectedUDV}
          onChange={onChangeUDV}
        />
      </div>
      {isDialogOpen && (
        <DialogBox closeDialogBox={onCloseDialogBox}>
          <div style={{ display: "flex", flexGrow: 1 }}>
            <JSONEditorTool content={{ json: udvDef }} />
          </div>
        </DialogBox>
      )}
    </>
  );
};

export default UDVNavigatorArea;
