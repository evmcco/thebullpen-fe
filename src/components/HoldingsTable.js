import React from "react";

import MaterialUITable from "./MaterialUITable"

const HoldingsTable = (props) => {
  console.log("PROPS", props)
  return (
    <>
      <MaterialUITable username={props.username} />
    </>
  )
}

export default HoldingsTable