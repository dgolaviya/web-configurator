import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const TabItemRow = (props) => {
  const { id, name, hide, rowIndex, showHideField } = props;
  const [isRowContentVisible, setRowContentVisible] = useState(false);

  const onToggleAccordion = () => {
    setRowContentVisible(!isRowContentVisible);
  };
  const onInputChange = useCallback(
    (e) => {
      const fieldDetails = { id: e.target.value, hide: !e.target.checked };
      showHideField(fieldDetails, rowIndex);
    },
    [showHideField]
  );
  return (
    <>
      <div className="tab-item-row">
        <div onClick={onToggleAccordion} className="tab-item-icon">
          <FontAwesomeIcon
            icon={isRowContentVisible ? "chevron-down" : "chevron-right"}
          />
        </div>
        <div className="mx-5 drag-icon">
          <FontAwesomeIcon icon="grip" />
        </div>
        <div className="tab-item-label">
          <input
            onChange={onInputChange}
            className="mx-5"
            type="checkbox"
            id={name}
            name={id}
            value={id}
            checked={!hide}
          />
          <label htmlFor={id}>{name}</label>
        </div>
      </div>
      {isRowContentVisible && <div>tab item properties to be displayed</div>}
    </>
  );
};

export default TabItemRow;
