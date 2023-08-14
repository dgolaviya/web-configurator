import React, { useEffect } from "react";
import { Editor, Frame, useEditor } from "@craftjs/core";
import * as uiControls from "./../UIControls";
import udv1 from "../../common/data/MFI_1.json";
import udv2 from "../../common/data/MFI_2.json";
import udv3 from "../../common/data/MFI_3.json";
import udv4 from "../../common/data/MFI_4.json";

const udvMapping = {
  MFI_1: udv1,
  MFI_2: udv2,
  MFI_3: udv3,
  MFI_4: udv4,
};

const RenderUDV = ({ udvId }) => {
  const editor = useEditor();
  useEffect(() => {
    if (udvId) {
      editor.actions.deserialize(udvMapping[udvId]?.udvDef);
    }
  }, []);

  return <Frame />;
};

const TabGrid = ({ tabConfiguration }) => (
  <Editor key={tabConfiguration?.udvId} resolver={uiControls}>
    <RenderUDV udvId={tabConfiguration?.udvId} />
  </Editor>
);
export default TabGrid;
