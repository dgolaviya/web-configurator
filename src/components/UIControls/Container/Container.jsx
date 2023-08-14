import React from "react";
import { useNode } from "@craftjs/core";
import styled from "styled-components";

const ContainerToolbarSettings = () => {
  const {
    actions: { setProp },
    width,
    height,
    flexDirection,
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
    border: node.data.props.border,
  }));

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
  // outline: 1px dashed #09f;
  // outline-offset: 2px;
  box-sizing: border-box;
`;

const Container = ({ children, ...rest }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return (
    <StyledContainer {...rest} ref={(ref) => connect(drag(ref))}>
      {children}
    </StyledContainer>
  );
};

Container.craft = {
  props: {
    width: "100%",
    height: "600px",
    flex: "none",
    flexDirection: "column",
    alignItems: "none",
    justifyContent: "none",
    border: "1px solid #ccc",
  },
  related: {
    toolbar: ContainerToolbarSettings,
  },
};

export default Container;
