import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles.scss";

const DialogBox = ({ closeDialogBox, children }) => (
  <div className="dialog-box">
    <h3>Dialog Box Content</h3>
    {children}
    <div onClick={closeDialogBox} className="close-icon">
      <FontAwesomeIcon className="fs-24" icon="circle-xmark" />
    </div>
  </div>
);

export default DialogBox;
