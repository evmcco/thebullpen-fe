import React, { useEffect } from "react";

import HoldingsTable from "./HoldingsTable"
import TopNav from "./TopNav"

import { useAuth0 } from "@auth0/auth0-react";



const Home = () => {
  return (
    <>
      <TopNav />
      <h1>Welcome to The Bullpen!</h1>
    </>
  )
}


export default Home

