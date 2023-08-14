import React from "react";
import UDVControl from "./UDVControl";

const UDVContolList = ({ controlList }) => (
  <>
    {controlList.map((control) => (
      <UDVControl key={control.id} {...control} />
    ))}
  </>
);

export default UDVContolList;
