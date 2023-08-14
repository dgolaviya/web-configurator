import React from "react";
import { Editor, Frame, Element } from "@craftjs/core";
import { Layers } from "@craftjs/layers";

import * as uiControls from "../UIControls";
import { UDVContolList } from "../UDVControlList";
import UDVNavigatorArea from "../UDVNavigatorArea";
import { UDVProvider, DispatchProvider } from "../../common/context";
import Toolbar from "../UIControls/Toolbar";

import "./styles.scss";

const controlList = [
  {
    name: "Container",
    id: "container",
  },
  {
    name: "Button",
    id: "button",
  },
  {
    name: "Text",
    id: "text",
  },
  {
    name: "Grid",
    id: "grid",
  },
  {
    name: "API Source",
    id: "apiSource",
  },
  {
    name: "API Transaction",
    id: "apiTransaction",
  },
  {
    name: "Select",
    id: "select",
  },
];

const UDVEditor = ({ toolInstanceId, toolId, udvId }) => (
  <div className="udv-editor">
    <Editor resolver={uiControls}>
      <DispatchProvider>
        <UDVProvider>
          <div className="udv-navigator-area">
            <UDVNavigatorArea
              udvId={udvId}
              toolId={toolId}
              toolInstanceId={toolInstanceId}
            />
          </div>
          <div className="udv-content-area">
            <div className="udv-control-list">
              <UDVContolList controlList={controlList} />
            </div>
            <div className="udv-layout-builder">
              <Frame>
                <Element is={uiControls.Container} canvas />
              </Frame>
            </div>
            <div className="udv-property-editor">
              <Toolbar />
              <h3 className="px-5">Layers</h3>
              <Layers />
            </div>
          </div>
        </UDVProvider>
      </DispatchProvider>
    </Editor>
  </div>
);

export default UDVEditor;
