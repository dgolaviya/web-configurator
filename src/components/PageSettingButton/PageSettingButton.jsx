import React from "react";
import "./styles.scss";

const PageSettingButton = (props) => {
  const { onToggleTabSelect, selectedTab, id, children } = props;
  const isSelected = id === selectedTab;

  const toggleSelection = () => {
    onToggleTabSelect(id, !isSelected);
  };

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      onClick={toggleSelection}
      className={`page-setting-icon-button ${isSelected && "highlight-button"}`}
    >
      {children}
    </div>
  );
};

export default PageSettingButton;
