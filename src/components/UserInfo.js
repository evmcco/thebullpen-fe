import React from "react";

import { makeStyles } from '@material-ui/core/styles';
import Palette from "../materials/Palette";

import UsernameWithAchivements from "./UsernameWithAchivements"
import UserStats from './UserStats'


const UserInfo = (props) => {
  const useStyles = makeStyles((theme) => ({
    header: {
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
    <div className={classes.header}>
      <div className={classes.headerText}><UsernameWithAchivements username={props.username} /></div>
      <UserStats
        username={props.username}
        amtOfFollowers={props.amtOfFollowers}
        amtOfFollows={props.amtOfFollows}
        userPerformance={props.userPerformance}
        handleTabChange={props.handleTabChange}
      />
    </div>
  )
}

export default UserInfo
