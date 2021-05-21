import React, {useState, useEffect} from "react";

import { makeStyles } from '@material-ui/core/styles';
import Palette from "../materials/Palette";

import UsernameWithAchivements from "./UsernameWithAchivements"
import UserStats from './UserStats'
import FollowButton from "./FollowButton"


const UserInfo = (props) => {
  const [loading, setLoading] = useState(true)
  const [dailyPerformance, setDailyPerformance] = useState([])

  useEffect(() => {
    setLoading(true)
    const getDailyPerformance = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/performance/daily/${props.username}`)
      const data = await response.json()
      setDailyPerformance(data)
    }
    getDailyPerformance()
      .then(() => {
        setLoading(false)
      })
  }, [props.username])

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
        <div className={classes.headerText}><UsernameWithAchivements username={props.username} /></div>
        {props.username !== props.auth0User ? <FollowButton auth0Following={props.auth0Following} username={props.username} auth0User={props.auth0User} isFollowing={props.isFollowing} setIsFollowing={props.setIsFollowing} /> : null}
        <UserStats
          username={props.username}
          amtOfFollowers={props.followers.length}
          amtOfFollows={props.following.length}
          handleTabChange={props.handleTabChange}
          dailyPerformance={dailyPerformance}
        />
      </div>}
    </>
  )
}

export default UserInfo
