import React, { useEffect } from "react";

import TopNav from "./TopNav"
import TrendingBullpens from "./TrendingBullpens"
import TrendingGroups from "./TrendingGroups"

import { useAuth0 } from "@auth0/auth0-react";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isAuthenticated) { console.log(user) }

  const useStyles = makeStyles({
    root: {
      flexGrow: 1
    },
    heading: {
      paddingTop: '64px',
      textAlign: 'center',
    }
  });

  const classes = useStyles();

  return (
    <>
      <TopNav />
      <div className={classes.heading}>
        <h1>Bullpen</h1>
        <h2>Stampeding toward the Moon since 2021</h2>
      </div>
      <div classname={classes.root} >
        <Grid container spacing={3} direction="row" justify="center">
          <Grid item xs={12} sm={6}>
            <TrendingBullpens />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TrendingGroups />
          </Grid>
        </Grid>
      </div>
    </>
  )
}


export default Home

