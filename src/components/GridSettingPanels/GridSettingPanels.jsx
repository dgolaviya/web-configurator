import React, { useState } from "react";
import ToolbarButton from "./ToolbarButton";

import ColumnsPanel from "./ColumnsPanel";

import "./styles.scss";

const gridSettingPanelMap = {
  columns: ColumnsPanel,
};

const GridSettingPanels = (props) => {
  const [selectedGridSettingPanel, setSelectedGridSettingPanel] = useState("");
  const RenderGridSettingPanel = gridSettingPanelMap[selectedGridSettingPanel];
  const onToggleToolPanel = (tabId, shouldSelect) => {
    if (shouldSelect) {
      setSelectedGridSettingPanel(tabId);
    } else {
      setSelectedGridSettingPanel("");
    }
  };
  return (
    <>
      {selectedGridSettingPanel && (
        <div className="grid-setting-panel-container">
          <RenderGridSettingPanel {...props} />
        </div>
      )}
      <div className="tool-bar-container">
        <ToolbarButton
          id="columns"
          icon="table"
          label="Columns"
          selectedGridSettingPanel={selectedGridSettingPanel}
          onToggleToolPanel={onToggleToolPanel}
        />
      </div>
    </>
  );
};

export default GridSettingPanels;
