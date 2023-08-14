import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ColumnRow = (props) => {
  const { headerName, field, hide, onChange } = props;
  const [isRowContentVisible, setRowContentVisible] = useState(false);

  const onToggleAccordion = () => {
    setRowContentVisible(!isRowContentVisible);
  };
  const showHideField = useCallback(
    (e) => {
      const payload = { field: e.target.value, hide: !e.target.checked };
      onChange(payload);
    },
    [onChange]
  );
  return (
    <>
      <div className="column-row">
        <div onClick={onToggleAccordion} className="column-icon">
          <FontAwesomeIcon
            icon={isRowContentVisible ? "chevron-down" : "chevron-right"}
          />
        </div>
        <div className="mx-5 drag-icon">
          <FontAwesomeIcon icon="grip" />
        </div>
        <div className="column-label">
          <input
            onChange={showHideField}
            className="mx-5"
            type="checkbox"
            id={headerName}
            name={field}
            value={field}
            checked={!hide}
          />
          <label htmlFor={headerName}>{headerName}</label>
        </div>
      </div>
      {isRowContentVisible && <div>column property</div>}
    </>
  );
};

export default ColumnRow;
