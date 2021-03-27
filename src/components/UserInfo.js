import React from "react";

import { makeStyles } from '@material-ui/core/styles';


const UserInfo = (props) => {
  const useStyles = makeStyles((theme) => ({
    header: {
    },
    headerText: {
      fontSize: '2em',
      padding: '15px 5% 0 5%',
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.header}>
      <div className={classes.headerText}>{props.username}'s bullpen</div>
    </div>
  )
}

export default UserInfo