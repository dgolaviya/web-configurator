import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DialogBox from "../DialogBox";
import "./styles.scss";

const DispatchActionsArea = () => {
  const [showDialog, setShowDialog] = useState(false);
  const onOpenDialog = () => {
    setShowDialog(true);
  };
  const closeDialogBox = () => {
    setShowDialog(false);
  };
  return (
    <div>
      <div className="dispatch-actions-area">
        <div className="dispatch-actions-control" onClick={onOpenDialog}>
          <FontAwesomeIcon className="fs-16" icon="plus" />
        </div>
        <div className="dispatch-actions-control" onClick={onOpenDialog}>
          <FontAwesomeIcon className="fs-16" icon="minus" />
        </div>
        <div className="dispatch-actions-control" onClick={onOpenDialog}>
          <FontAwesomeIcon className="fs-16" icon="pencil" />
        </div>
        <div className="dispatch-actions-control" onClick={onOpenDialog}>
          <FontAwesomeIcon className="fs-16" icon="fa-solid fa-ellipsis" />
        </div>
      </div>
      {showDialog && <DialogBox closeDialogBox={closeDialogBox} />}
    </div>
  );
};

export default DispatchActionsArea;
