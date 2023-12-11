import React from "react";
import { useNode } from "@craftjs/core";
import styled from "styled-components";

import { useUDVContext } from "../../../common/context";

import JSONEditorTool from "../../JSONEditorTool";
import "./styles.scss";

const InputUDVContainerToolbarSettings = () => {
  const {
    actions: { setProp },
    width,
    height,
    flexDirection,
    apiConfig,
    flex,
    justifyContent,
    alignItems,
    border,
  } = useNode((node) => ({
    width: node.data.props.width,
    height: node.data.props.height,
    flexDirection: node.data.props.flexDirection,
    alignItems: node.data.props.alignItems,
    justifyContent: node.data.props.justifyContent,
    flex: node.data.props.flex,
    apiConfig: node.data.props.apiConfig,
    border: node.data.props.border,
  }));

  const onAPIConfigChange = (event) => {
    if (event.text) {
      try {
        setProp((prop) => (prop.apiConfig = JSON.parse(event.text)));
      } catch (error) {
        console.log(error?.message);
      }
    } else {
      setProp((prop) => (prop.apiConfig = event.json));
    }
  };

  const onWidthChange = (e) => {
    setProp((prop) => (prop.width = e.target.value));
  };

  const onHeightChange = (e) => {
    setProp((prop) => (prop.height = e.target.value));
  };

  const onDirectionChange = (e) => {
    setProp((prop) => (prop.flexDirection = e.target.value));
  };

  const onFlexChange = (e) => {
    setProp((prop) => (prop.flex = e.target.value));
  };

  const onAlignItemsChange = (e) => {
    setProp((prop) => (prop.alignItems = e.target.value));
  };

  const onJustifyContentChange = (e) => {
    setProp((prop) => (prop.justifyContent = e.target.value));
  };

  const onBorderChange = (e) => {
    setProp((prop) => (prop.border = e.target.value));
  };

  return (
    <div>
      <div className="pb-5 px-5">
        <div>Width</div>
        <input
          type="text"
          value={width}
          placeholder="Width"
          onChange={onWidthChange}
        />
      </div>
      <div className="pb-5 px-5">
        <div>Height</div>
        <input
          type="text"
          value={height}
          placeholder="Height"
          onChange={onHeightChange}
        />
      </div>
      <div className="pb-5 px-5">
        <div>Flex Direction</div>
        <input
          type="text"
          value={flexDirection}
          placeholder="Flex Direction"
          onChange={onDirectionChange}
        />
      </div>
      <div className="pb-5 px-5">
        <div>Flex</div>
        <input
          type="text"
          value={flex}
          placeholder="Flex"
          onChange={onFlexChange}
        />
      </div>
      <div className="pb-5 px-5">
        <div>Align Items</div>
        <input
          type="text"
          value={alignItems}
          placeholder="Flex"
          onChange={onAlignItemsChange}
        />
      </div>
      <div className="pb-5 px-5">
        <div>Justify Content</div>
        <input
          type="text"
          value={justifyContent}
          placeholder="Flex"
          onChange={onJustifyContentChange}
        />
      </div>
      <div className="pb-5 px-5">
        <div>Border</div>
        <input
          type="text"
          value={border}
          placeholder="Flex"
          onChange={onBorderChange}
        />
      </div>
      <div className="pb-5 px-5">
        <div>API Configuration</div>
        <JSONEditorTool
          onChange={onAPIConfigChange}
          content={{ json: apiConfig }}
        />
      </div>
    </div>
  );
};

const StyledContainer = styled.div`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  display: flex;
  flex: ${(props) => props.flex};
  flex-direction: ${(props) => props.flexDirection};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};
  border: ${(props) => props.border};
  box-sizing: border-box;
`;

const InputUDVContainer = (props) => {
  const { children, apiConfig } = props;
  const { state: udvState, dispatch } = useUDVContext();
  const {
    connectors: { connect, drag },
  } = useNode();

  const onSubmitForm = (event) => {
    event.stopPropagation();
    console.log(apiConfig, "apiConfig", udvState);
  };

  return (
    <StyledContainer {...props} ref={(ref) => connect(drag(ref))}>
      <div className="input-udv-fields-container">{children}</div>
      <div className="input-udv-transaction-row ">
        <button onClick={onSubmitForm} className="mr-10 my-5">
          Submit
        </button>
        <button className="mr-10 my-5">Cancel</button>
      </div>
    </StyledContainer>
  );
};

InputUDVContainer.craft = {
  props: {
    width: "100%",
    height: "800px",
    flex: "none",
    apiConfig: {},
    flexDirection: "column",
    alignItems: "none",
    justifyContent: "space-between",
    border: "1px solid #ccc",
  },
  related: {
    toolbar: InputUDVContainerToolbarSettings,
  },
};

export default InputUDVContainer;
