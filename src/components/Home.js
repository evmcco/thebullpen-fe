import React from "react";

import UserGroupsList from "./UserGroupsList"
import Leaderboard from "./Leaderboard"
import TrendingGroups from "./TrendingGroups"
import UnderConstruction from "./UnderConstruction"

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
      textAlign: 'center',
    },
    subheading: {
      color: theme.palette.grey[50]
    }
  }));

  const classes = useStyles();
  if (isLoading) {
    return <div className={classes.body} />
  } else {
    return (
      isAuthenticated ?
        <div className={classes.body} >
          {/* <div className={classes.heading}>
            <h1>Bullpen</h1>
            <h2 className={classes.subheading}>Stampeding toward the Moon since 2021</h2>
          </div> */}
          <div className={classes.root} >
            <Grid container direction="row" justify="center">
              <Grid item xs={12} sm={6}>
                <Leaderboard />
              </Grid>
              <Grid item xs={12} sm={6}>
                {isAuthenticated && <UserGroupsList username={user["https://thebullpen.app/username"]} title={"My Groups"} />}
                <TrendingGroups />
              </Grid>
            </Grid>
          </div>
        </div >
        : <UnderConstruction />
    )
  }
}


export default Home

