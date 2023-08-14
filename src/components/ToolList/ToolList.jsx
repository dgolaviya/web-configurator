import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ToolItemAccordion from "./ToolItemAccordion";
import {
  DISPATCH_EDITOR_TOOL_ID,
  MESSAGE_EDITOR_TOOL_ID,
  UDV_EDITOR_TOOL_ID,
} from "../../common/constants/constants";
import { useUIManagerContext, uiManagerReducer } from "../../common/context";

import "./styles.scss";

const toolList = [
  {
    id: UDV_EDITOR_TOOL_ID,
    title: "UDV Editor",
    instanceTitle: "Tag, Id",
    icon: "fa-solid fa-compass-drafting",
  },
  {
    id: DISPATCH_EDITOR_TOOL_ID,
    title: "Dispatches",
    instanceTitle: "Group, Name",
    icon: "fa-solid fa-desktop",
  },
  {
    id: MESSAGE_EDITOR_TOOL_ID,
    title: "Messages",
    instanceTitle: "Id",
    icon: "fa-solid fa-message",
  },
];

const ToolList = ({ selectedToolInstanceId }) => {
  const { state: uiManagerState, dispatch } = useUIManagerContext();
  const { openedTools } = uiManagerState;

  const onSelectToolItem =
    (toolId, toolInstanceId, udvId, selectedDispatchInfo) => () => {
      const payload = { toolId, toolInstanceId, udvId, selectedDispatchInfo };
      dispatch({ type: uiManagerReducer.SELECT_TOOL_ITEM, payload });
    };

  return (
    <div className="tool-list">
      {toolList.map(({ title, icon, id, instanceTitle }) => (
        <ToolItemAccordion key={id} toolId={id} title={title} icon={icon}>
          {openedTools[id]?.map(
            ({ toolId, toolInstanceId, udvId, selectedDispatchInfo }) => (
              <div
                onClick={onSelectToolItem(
                  toolId,
                  toolInstanceId,
                  udvId,
                  selectedDispatchInfo
                )}
                key={toolInstanceId}
                className="p-5 tool-list-item"
              >
                {selectedToolInstanceId === toolInstanceId && (
                  <FontAwesomeIcon
                    icon="fa-solid fa-circle"
                    className="pr-5 fs-8"
                    color="green"
                  />
                )}
                {instanceTitle}:{udvId}
                {selectedDispatchInfo?.dispatchGroup?.groupName},
                {selectedDispatchInfo?.dispatchGroupItem?.dispatchName}
              </div>
            )
          )}
        </ToolItemAccordion>
      ))}
    </div>
  );
};

export default ToolList;
