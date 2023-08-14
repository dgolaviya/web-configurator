import React from "react";
import { useEditor } from "@craftjs/core";

const Toolbar = () => {
  const { selectededNodeId, ToolbarSettings } = useEditor((state) => {
    const selectedNodes = Array.from(state.events.selected);
    return {
      selectededNodeId: selectedNodes[0],
      ToolbarSettings: state.nodes[selectedNodes[0]]?.related?.toolbar,
    };
  });
  return (
    <div>
      <h3 className="px-5">Property Editor</h3>
      {selectededNodeId && ToolbarSettings && <ToolbarSettings />}
    </div>
  );
};

export default Toolbar;
