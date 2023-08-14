import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import GridView from "../DispatchView";
import PageSettingButton from "../PageSettingButton";
import PageSettingsPanel from "../PageSettingsPanel";
import { useUIManagerContext, uiManagerReducer } from "../../common/context";
import {
  DISPATCH_SETTINGS_PANEL,
  TABS_CONFIG_PANEL,
  API_CONFIG_PANEL,
  COLUMNS_CONFIG_PANEL,
} from "../../common/constants/constants";
import "./styles.scss";

const pageSettingsButtonsConfig = [
  {
    id: DISPATCH_SETTINGS_PANEL,
    icon: "fa-solid fa-screwdriver-wrench",
  },
  {
    id: TABS_CONFIG_PANEL,
    icon: "fa-solid fa-link",
  },
  {
    id: API_CONFIG_PANEL,
    icon: "fa-solid fa-database",
  },
  {
    id: COLUMNS_CONFIG_PANEL,
    icon: "fa-solid fa-table",
  },
];

const DispatchGroup = ({
  group,
  dispatches,
  onSelectDispatch,
  selectedDispatchInfo,
}) => {
  const [isOpen, toggleIsOpen] = useState(false);
  const dispatchGroupItems = dispatches[group.groupId];
  const onToggleContent = () => {
    toggleIsOpen(!isOpen);
  };

  const onAddNewDispatchItem = (e) => {
    e.stopPropagation();
    const dispatchId = `MFI_${Math.random() * 100 ** 10}${Date.now()}`;
    const dispatchGroupItem = {
      groupId: group.groupId,
      dispatchId,
      dispatchName: dispatchId,
      columnDefs: [],
      apiConfig: {},
      tabDefs: [],
    };
    onSelectDispatch({ dispatchGroup: group, dispatchGroupItem });
  };

  return (
    <div>
      <div
        onClick={onToggleContent}
        className={`dispatch-group-row p-10 ${isOpen && "highlight-header"}`}
      >
        {group.groupName}
        <div>
          <FontAwesomeIcon
            onClick={onAddNewDispatchItem}
            className="mr-5"
            icon="fa-solid fa-plus"
          />
          <FontAwesomeIcon
            icon={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
          />
        </div>
      </div>
      {isOpen &&
        dispatchGroupItems?.map((dispatchGroupItem) => (
          <DispatchGroupItem
            dispatchGroup={group}
            selectedDispatchInfo={selectedDispatchInfo}
            key={`${dispatchGroupItem.groupId}-${dispatchGroupItem.dispatchId}`}
            dispatchGroupItem={dispatchGroupItem}
            onSelectDispatch={onSelectDispatch}
          />
        ))}
    </div>
  );
};

const DispatchGroupItem = ({
  dispatchGroupItem,
  onSelectDispatch,
  dispatchGroup,
  selectedDispatchInfo,
}) => {
  const { dispatchGroupItem: selectedItem } = selectedDispatchInfo || {};
  const onSelectDispatchGroupItem = (e) => {
    e.stopPropagation();
    onSelectDispatch({ dispatchGroup, dispatchGroupItem });
  };
  return (
    <div onClick={onSelectDispatchGroupItem} className="p-10">
      {dispatchGroupItem.dispatchId === selectedItem?.dispatchId && (
        <FontAwesomeIcon
          icon="fa-solid fa-circle"
          className="pr-5 fs-8"
          color="green"
        />
      )}
      {dispatchGroupItem.dispatchName}
    </div>
  );
};

const DispatchEditor = ({ toolInstanceId, toolId, selectedDispatchInfo }) => {
  const { state: uiManagerState, dispatch } = useUIManagerContext();
  const { dispatchGroups, dispatches } = uiManagerState;
  const [selectedPageSettingsPanel, setSelectedPageSettingsPanel] =
    useState("");

  useEffect(() => {
    // TODO Need to Set actual groups in payload instead of using dummy.
    const payload = {};
    dispatch({ type: uiManagerReducer.LOAD_DISPATCH_GROUPS, payload });
    dispatch({ type: uiManagerReducer.LOAD_DISPATCHES, payload });
  }, []);

  const onPageSettingsPanelSelect = (panelId, shouldSelect) => {
    if (shouldSelect) {
      setSelectedPageSettingsPanel(panelId);
    } else {
      setSelectedPageSettingsPanel("");
    }
  };

  const onSelectDispatch = (dispatchInfo) => {
    const payload = {
      toolInstanceId,
      toolId,
      selectedDispatchInfo: dispatchInfo,
    };
    dispatch({ type: uiManagerReducer.SELECT_DISPATCH_ITEM, payload });
  };

  return (
    <div className="dispatch-editor">
      <div className="dispatch-groups-area">
        <div className="dispatch-groups-title">
          <div>
            <FontAwesomeIcon className="pr-5" icon="fa-solid fa-object-group" />
            Dispatch Groups
          </div>
          <FontAwesomeIcon
            // onClick={onAddNewItem}
            icon="fa-solid fa-plus"
          />
        </div>
        {dispatchGroups.map((dg) => (
          <DispatchGroup
            onSelectDispatch={onSelectDispatch}
            selectedDispatchInfo={selectedDispatchInfo}
            key={dg.groupId}
            group={dg}
            dispatches={dispatches}
          />
        ))}
      </div>
      <div className="dipatch-configuration-area">
        <div className="dispatch-preview-area">
          {selectedDispatchInfo?.dispatchGroup?.groupId && (
            <GridView dispatchConfiguration={selectedDispatchInfo} />
          )}
          {selectedPageSettingsPanel && (
            <PageSettingsPanel
              selectedPageSettingsPanel={selectedPageSettingsPanel}
              selectedDispatchInfo={selectedDispatchInfo}
              toolInstanceId={toolInstanceId}
              toolId={toolId}
            />
          )}
        </div>
        {selectedDispatchInfo?.dispatchGroup?.groupId && (
          <div className="page-settings-list">
            {pageSettingsButtonsConfig.map((psBtn) => (
              <PageSettingButton
                id={psBtn.id}
                selectedTab={selectedPageSettingsPanel}
                onToggleTabSelect={onPageSettingsPanelSelect}
              >
                <FontAwesomeIcon
                  icon={psBtn.icon}
                  className="fs-18"
                  color="white"
                />
              </PageSettingButton>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DispatchEditor;
