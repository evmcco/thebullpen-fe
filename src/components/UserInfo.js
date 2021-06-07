import React, {useState, useEffect, useContext} from "react";

import { makeStyles } from '@material-ui/core/styles';

import UsernameWithAchivements from "./UsernameWithAchivements"
import UserStats from './UserStats'
import FollowButton from "./FollowButton"

const UserInfo = (props) => {
  const [loading, setLoading] = useState(true)
  const [dailyPerformance, setDailyPerformance] = useState([])
  const [profileUsername, setProfileUsername] = useState('')


  useEffect(() => {
    setLoading(true)
    const getUserDailyPerformance = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/performance/today/${props.username}`)
      const data = await response.json()
      setDailyPerformance(data.performance)
    }

    if (props.isLoading === false) {
      getUserDailyPerformance()
        .then(() => {
          setProfileUsername(props.username)
          setTimeout(() => {
            setLoading(false)
          }, 500)
        })
    }
  }, [props.isLoading, props.username])

  const useStyles = makeStyles((theme) => ({
    header: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '171px',
    },
    headerText: {
      color: theme.palette.grey[50],
      fontSize: '2em',
      padding: '15px 5%',
      textAlign: 'center'
    }
  }));

  const classes = useStyles();

  return (
    <>
    {loading ?
    <div className="loader-wrapper">
      <div className="loader" />
    </div>
      :
      <div className={classes.header}>
        <div className={classes.headerText}><UsernameWithAchivements username={profileUsername} /></div>
        {props.isAuthenticated && profileUsername !== props.auth0User ?
          <FollowButton
            username={profileUsername}
            auth0User={props.auth0User}
            />
          : null
        }
        <UserStats
          username={profileUsername}
          handleTabChange={props.handleTabChange}
          dailyPerformance={dailyPerformance}
        />
      </div>}
    </>
  )
}

export default UserInfo
