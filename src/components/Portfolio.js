import React from "react";

import HoldingsTable from "./HoldingsTable"
import UserInfo from "./UserInfo"
import TopNav from "./TopNav"

const Portfolio = ({ match }) => {
  return (
    <>
      <TopNav />
      <UserInfo username={match.params.username} />
      <HoldingsTable username={match.params.username} />
    </>
  )
}

export default Portfolio

