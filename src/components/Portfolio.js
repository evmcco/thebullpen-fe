import React from "react";

import HoldingsTable from "./HoldingsTable"
import TopNav from "./TopNav"

const Portfolio = ({ match }) => {
  console.log(match.params.username)

  return (
    <>
      <TopNav />
      <HoldingsTable username={match.params.username} />
    </>
  )
}

export default Portfolio

