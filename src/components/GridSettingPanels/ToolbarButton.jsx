import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ToolbarButton = ({
  onToggleToolPanel,
  selectedGridSettingPanel,
  id,
  icon,
  label,
}) => {
  const isSelected = id === selectedGridSettingPanel;
  const toggleSelection = () => {
    onToggleToolPanel(id, !isSelected);
  };
  return (
    <div
      onClick={toggleSelection}
      className={`tool-bar-button ${isSelected && "highlight-button"}`}
    >
      <FontAwesomeIcon icon={icon} className="button-icon" />
      <span>{label}</span>
    </div>
  );
};

export default ToolbarButton;
