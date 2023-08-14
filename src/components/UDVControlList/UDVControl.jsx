import React from "react";
import { useEditor, Element } from "@craftjs/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Text,
  Button,
  Container,
  DataGrid,
  APISource,
  APITransaction,
  Select,
} from "../UIControls";

import "./styles.scss";

const uiControlsMapping = {
  container: {
    component: Container,
    props: {
      canvas: true,
    },
  },
  text: {
    component: Text,
  },
  button: {
    component: Button,
  },
  grid: {
    component: DataGrid,
  },
  apiSource: {
    component: APISource,
  },
  apiTransaction: {
    component: APITransaction,
  },
  select: {
    component: Select,
  },
};

const UDVControl = ({ name, id }) => {
  const editor = useEditor();
  const {
    connectors: { create },
  } = editor;
  const { component, props: renderProps } = uiControlsMapping[id] || {};
  return (
    <div
      ref={(ref) => create(ref, <Element is={component} {...renderProps} />)}
      className="udv-control"
    >
      <FontAwesomeIcon
        icon="fa-solid fa-arrows-up-down-left-right"
        className="fs-16 pr-10"
      />
      <span className="fs-16">{name}</span>
    </div>
  );
};

export default UDVControl;
