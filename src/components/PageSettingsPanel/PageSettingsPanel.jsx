import React from "react";
import TabSettingsPanel from "../TabSettingsPanel";
import APISettingsPanel from "../APISettingsPanel";
import ColumnsSettingsPanel from "../ColumnsSettingsPanel";
import {
  TABS_CONFIG_PANEL,
  DISPATCH_SETTINGS_PANEL,
  API_CONFIG_PANEL,
  COLUMNS_CONFIG_PANEL,
} from "../../common/constants/constants";

import "./styles.scss";

const settingPanelsMap = {
  [TABS_CONFIG_PANEL]: TabSettingsPanel,
  [API_CONFIG_PANEL]: APISettingsPanel,
  [COLUMNS_CONFIG_PANEL]: ColumnsSettingsPanel,
  [DISPATCH_SETTINGS_PANEL]: () => (
    <div>Dispatch Setting Panel to be displayed</div>
  ),
};

const PageSettingsPanel = ({
  selectedDispatchInfo,
  selectedPageSettingsPanel,
  toolId,
  toolInstanceId,
}) => {
  const {
    dispatchGroupItem: { dispatchId } = {},
    dispatchGroup: { groupId },
  } = selectedDispatchInfo;
  const RenderSettingPanel = settingPanelsMap[selectedPageSettingsPanel];
  const dispatchUniqueKey = `${groupId}-${dispatchId}`;
  return (
    <div className="page-settings-panel">
      {RenderSettingPanel && (
        <RenderSettingPanel
          key={dispatchUniqueKey}
          toolId={toolId}
          toolInstanceId={toolInstanceId}
          selectedDispatchInfo={selectedDispatchInfo}
        />
      )}
    </div>
  );
};

export default PageSettingsPanel;
