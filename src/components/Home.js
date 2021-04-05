import React, { useEffect } from "react";

import TopNav from "./TopNav"
import UserGroupsList from "./UserGroupsList"
import TrendingBullpens from "./TrendingBullpens"
import TrendingGroups from "./TrendingGroups"


import { useAuth0 } from "@auth0/auth0-react";

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const Home = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const useStyles = makeStyles((theme) => ({
    body: {
      backgroundColor: theme.palette.grey[900],
      height: '100%'
    },
    root: {
      flexGrow: 1
    },
    heading: {
      color: theme.palette.grey[50],
      paddingTop: '64px',
      textAlign: 'center',
    },
    subheading: {
      color: theme.palette.grey[50]
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.body}>
      <TopNav />
      <div className={classes.heading}>
        <h1>Bullpen</h1>
        <h2 className={classes.subheading}>Stampeding toward the Moon since 2021</h2>
      </div>
      <div className={classes.root} >
        <Grid container spacing={3} direction="row" justify="center">
          {isAuthenticated &&
            <Grid item xs={12} sm={6}>
              <UserGroupsList username={user["https://thebullpen.app/username"]} title={"My Groups"} />
            </Grid>}
          <Grid item xs={12} sm={6}>
            <TrendingBullpens />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TrendingGroups />
          </Grid>
        </Grid>
      </div>
    </div>
  )
}


export default Home

