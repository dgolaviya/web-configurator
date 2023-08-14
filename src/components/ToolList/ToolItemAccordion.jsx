import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useUIManagerContext, uiManagerReducer } from "../../common/context";

const ToolItemAccordion = (props) => {
  const [isOpen, toggleIsOpen] = useState(false);
  const { dispatch } = useUIManagerContext();
  const { children, title, icon, toolId } = props;

  const onToggleContent = () => {
    toggleIsOpen(!isOpen);
  };
  const onAddNewItem = (event) => {
    event.stopPropagation();
    const payload = { toolId };
    toggleIsOpen(true);
    dispatch({ type: uiManagerReducer.REGISTER_NEW_TOOL_ITEM, payload });
  };

  return (
    <div className="accordion-container">
      <div
        onClick={onToggleContent}
        className={`accordion-header ${isOpen && "highlight-header"}`}
      >
        <div>
          <FontAwesomeIcon className="mr-5" icon={icon} />
          {title}
        </div>
        <div>
          <FontAwesomeIcon
            onClick={onAddNewItem}
            className="mr-5"
            icon="fa-solid fa-plus"
          />
          <FontAwesomeIcon
            icon={`fa-solid ${isOpen ? "fa-chevron-up" : "fa-chevron-down"}`}
          />
        </div>
      </div>
      {isOpen && <div className="accordion-content">{children}</div>}
    </div>
  );
};

export default ToolItemAccordion;
