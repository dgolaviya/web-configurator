import React from "react";

import ToolList from "../ToolList";
import UDVEditor from "../UDVEditor";
import {
  DISPATCH_EDITOR_TOOL_ID,
  MESSAGE_EDITOR_TOOL_ID,
  UDV_EDITOR_TOOL_ID,
} from "../../common/constants/constants";
import DispatchEditor from "../DispatchEditor";
import { UIManagerProvider, useUIManagerContext } from "../../common/context";
import "./styles.scss";

const MessageEditor = () => <h3>Message Editor To be displayed here</h3>;

const uiManagerToolMap = {
  [DISPATCH_EDITOR_TOOL_ID]: DispatchEditor,
  [MESSAGE_EDITOR_TOOL_ID]: MessageEditor,
  [UDV_EDITOR_TOOL_ID]: UDVEditor,
};

const UIManager = () => {
  const { state: uiManagerState } = useUIManagerContext();
  const selectedToolItem = uiManagerState.selectedToolItem;
  const { toolId, toolInstanceId, udvId, selectedDispatchInfo } =
    selectedToolItem;
  const RenderTool = uiManagerToolMap[toolId];
  return (
    <div className="ui-manager-app">
      <div className="ui-manager-header fs-18 px-10">UI Manager</div>
      <div className="ui-manager">
        <div className="tools-list-container">
          <ToolList selectedToolInstanceId={toolInstanceId} />
        </div>
        <div className="tool-work-area">
          {RenderTool && (
            <RenderTool
              key={toolInstanceId}
              udvId={udvId}
              selectedDispatchInfo={selectedDispatchInfo}
              toolId={toolId}
              toolInstanceId={toolInstanceId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const UIManagerApp = () => (
  <UIManagerProvider>
    <UIManager />
  </UIManagerProvider>
);

export default UIManagerApp;
