import React from "react";

import { makeStyles } from '@material-ui/core/styles';


const UserInfo = (props) => {
  const useStyles = makeStyles((theme) => ({
    header: {
      maxWidth: '90%',
      margin: '5%',
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.header}>
      <h1><strong>{props.username}'s bullpen</strong></h1>
    </div>
  )
}

export default UserInfo