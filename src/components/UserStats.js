import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';



const UserStats = ({amtOfFollowers, amtOfFollows, handleTabChange, dailyPerformance }) => {

  const useStyles = makeStyles((theme) => ({
    userStatsContainer: {
      display: 'flex',
      justifyContent: 'center',
      margin: '15px',
    },
    statContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      margin: '0 10px',
    },
    amtDisplay: {
      color: theme.palette.lilac,
      margin: 0
    },
    subTitle: {
      margin: 0,
      fontSize: '0.8em',
    },
    green: {
      color: theme.palette.positive,
      margin: 0
    },
    red: {
      color: theme.palette.negative,
      margin: 0
    },
    marginZero: {
      margin: 0,
    },
    followHover: {
      '&:hover': {cursor: 'pointer'},
    }
  }));

  const classes = useStyles();

  return (
      <div className={classes.userStatsContainer}>
        <div className={clsx(classes.statContainer, classes.followHover)} onClick={(e) => handleTabChange(e, 3)}>
          <h2 className={classes.amtDisplay}>{amtOfFollowers}</h2>
          <p className={classes.subTitle}>followers</p>
        </div>

        <div className={classes.statContainer}>
          <h2 className={dailyPerformance > 0 ? classes.green : dailyPerformance < 0 ? classes.red : classes.marginZero}>{dailyPerformance > 0 ? '+' : null}{Number(dailyPerformance).toFixed(2)}%</h2>
          <p className={classes.subTitle}>today's return</p>
        </div>

        <div className={clsx(classes.statContainer, classes.followHover)} onClick={(e) => handleTabChange(e, 4)}>
          <h2 className={classes.amtDisplay}>{amtOfFollows}</h2>
          <p className={classes.subTitle}>following</p>
        </div>
      </div>
  )
}

export default UserStats
