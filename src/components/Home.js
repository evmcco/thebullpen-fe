import React, { useEffect } from "react";

import TopNav from "./TopNav"
import TrendingBullpens from "./TrendingBullpens"

import { useAuth0 } from "@auth0/auth0-react";

import { makeStyles } from '@material-ui/core/styles';

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isAuthenticated) { console.log(user) }

  const useStyles = makeStyles({
    heading: {
      textAlign: 'center',
    }
  });

  const classes = useStyles();

  return (
    <>
      <TopNav />
      <h1 className={classes.heading}>Bullpen</h1>
      <h2 className={classes.heading}>Stampeding toward the Moon since 2021</h2>
      <TrendingBullpens />
    </>
  )
}


export default Home

