import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';



const UserStats = ({username, amtOfFollowers, amtOfFollows, handleTabChange }) => {

  const [dailyPerformance, setDailyPerformance] = useState([])

  useEffect(() => {
    const getDailyPerformance = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/performance/daily/${username}`)
      const data = await response.json()
      console.log(data)
      setDailyPerformance(data)
    }
    getDailyPerformance()
  }, [username])


  const useStyles = makeStyles((theme) => ({
    userStatsContainer: {
      display: 'flex',
      justifyContent: 'center'
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
        <h2 className={dailyPerformance > 0 ? classes.green : dailyPerformance < 0 ? classes.red : null}>{dailyPerformance > 0 ? '+' : null}{dailyPerformance}%</h2>
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
