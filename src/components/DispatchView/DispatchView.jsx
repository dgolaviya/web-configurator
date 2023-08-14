import React, { useState, useEffect } from "react";

import DataTable from "../DataTable";
import { useDispatchContext } from "../../common/context";
import TabGrid from "../TabGrid";
import TabButton from "../TabButton";
import DispatchActionsArea from "../DispatchActionsArea";
import "./styles.scss";

const DispatchView = () => {
  const [selectedTab, setSelectedTab] = useState("");
  const { state: dispatchState } = useDispatchContext();
  const { tabDefs, groupName, dispatchName, groupId, dispatchId } =
    dispatchState;
  const selectedTabConfiguration = tabDefs?.find((mi) => mi.id === selectedTab);
  const onTabSelect = (tabId, shouldSelect) => {
    if (shouldSelect) {
      setSelectedTab(tabId);
    } else {
      setSelectedTab("");
    }
  };

  useEffect(() => {
    setSelectedTab("");
  }, [groupId, dispatchId]);

  return (
    <div className="grid-view">
      <div className="grid-display-area">
        <div className="m-10">
          <h3>{`${groupName} -> ${dispatchName}`}</h3>
          <DispatchActionsArea />
        </div>
        <div className="main-grid-area">
          <DataTable />
        </div>
        {selectedTab && (
          <div className="tab-grid-area px-5 pb-5">
            <TabGrid tabConfiguration={selectedTabConfiguration} />
          </div>
        )}
        <div className="tabs-list">
          {tabDefs
            .filter((m) => !m.hide)
            .map((menuItem) => {
              const { id, name } = menuItem;
              return (
                <TabButton
                  selectedTab={selectedTab}
                  onToggleTabSelect={onTabSelect}
                  key={id}
                  {...menuItem}
                >
                  {name}
                </TabButton>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DispatchView;
