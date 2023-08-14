import React from "react";
import { useNode } from "@craftjs/core";

const ButtonToolbarSettings = () => {
  const {
    actions: { setProp },
    text,
    fontSize,
  } = useNode((node) => ({
    text: node.data.props.text,
  }));

  const onTextChange = (e) => {
    setProp((prop) => (prop.text = e.target.value));
  };

  const onFontSizeChange = (e) => {
    setProp((prop) => (prop.fontSize = e.target.value));
  };

  return (
    <div>
      <div className="pb-5 px-5">
        <div>Text</div>
        <input
          type="text"
          value={text}
          placeholder="Text"
          onChange={onTextChange}
        />
      </div>
      <div className="pb-5 px-5">
        <div>FontSize</div>
        <input
          type="text"
          value={fontSize}
          placeholder="Font Size"
          onChange={onFontSizeChange}
        />
      </div>
    </div>
  );
};

const Button = ({ text }) => {
  const {
    connectors: { connect, drag },
  } = useNode();
  return <button ref={(ref) => connect(drag(ref))}>{text}</button>;
};
Button.craft = {
  props: {
    text: "Initial Button",
  },
  related: {
    toolbar: ButtonToolbarSettings,
  },
};

export default Button;
