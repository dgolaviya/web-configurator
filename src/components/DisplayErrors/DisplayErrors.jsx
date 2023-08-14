import React from "react";
import "./styles.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DisplayErrors = ({ errors }) =>
  errors.map((err) => (
    <div className="error">
      <FontAwesomeIcon icon="info-circle" className="fs-24 mr-10 c-white" />
      <span>{err}</span>
    </div>
  ));

export default DisplayErrors;
