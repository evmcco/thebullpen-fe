import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

import UsernameWithAchivements from "./UsernameWithAchivements"

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    const getLeaderboard = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/performance/leaderboard/today`)
      const data = await response.json()
      setLeaderboard(data)
    }
    getLeaderboard()
  }, [])

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.grey[50],
      margin: '20px 15px',
      maxWidth: 600,
      paddingBottom: '16px'
    },
    headerGrid: {
    },
    title: {
      color: theme.palette.grey[50],
      margin: 0
    },
    date: {
      color: theme.palette.grey[400],
      fontSize: 14,
      margin: 0
    },
    headerBorder: {
      borderTop: 'solid 1px',
      height: 2
    },
    grid: {
      height: 36,
      paddingRight: 8,
      flexWrap: 'nowrap',
    },
    place: {
      marginRight: 18,
      textAlign: 'center',
      width: 15
    },
    leftGrid: {
      width: '65%',
      flexWrap: 'nowrap',
    },
    link: {
      color: theme.palette.grey[50],
      textDecoration: 'none'
    },
    performance: {
      borderRadius: 7,
      color: theme.palette.grey[50],
      textAlign: 'center',
      width: '35%',
      maxWidth: 120
    },
    green: {
      backgroundColor: theme.palette.positive,
      fontWeight: 'bold'
    },
    red: {
      backgroundColor: theme.palette.negative,
      fontWeight: 'bold'
    },
    lilac: {
      backgroundColor: theme.palette.lilac,
      fontWeight: 'bold'
    }
  }));

  const classes = useStyles();

  const trimDate = (date) => {
    return date.split('T')[0]
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        {leaderboard.length > 0 ? (
          <>
            <Grid container direction="row" justify="space-between" alignItems="flex-end">
              <h2 className={classes.title}>Leaderboard</h2>
              <p className={classes.date}>{trimDate(leaderboard[0].date)}</p>
            </Grid>
            <div className={classes.headerBorder}></div>
            {leaderboard.map((user, index) => (
              <Grid key={user.username} className={classes.grid} container direction="row" justify="space-between" alignItems="center">
                <Grid className={classes.leftGrid} container direction="row" justify="flex-start" alignItems="center">
                  <p className={classes.place}>{index + 1}</p>
                  <div>
                    <Link className={classes.link} to={`/p/${user.username}`}>
                      <UsernameWithAchivements username={user.username} />
                    </Link>
                  </div>
                </Grid>
                <p className={`${classes.performance} ${index === 0 ? classes.lilac : user.performance > 0 ? classes.green : user.performance < 0 ? classes.red : null}`}>{Number(user.performance).toFixed(2)}%</p>
              </Grid>
            ))}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
    </Card>
  )
}

