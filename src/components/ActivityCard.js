import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';



const ActivityCard = (props) => {
  const useStyles = makeStyles((theme) => ({
    card: {
      backgroundColor: theme.palette.grey[800],
      borderRadius: 10,
      margin: '8px auto',
      maxWidth: 400,
      minWidth: 250,
      padding: '10px 15px',
      display: 'flex',
      flexDirection: 'column',

    },
    topContainer: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    username: {
      color: theme.palette.common.white,
      margin: 0,
      marginRight: 10
    },
    date: {
      color: theme.palette.common.white,
      margin: 0,
    },
    descriptionContainer: {
      margin: 'auto 0'
    },
    description: {
      color: theme.palette.common.white,
    },
    reactionsContainer:{
      display: 'flex',
      marginLeft: 'auto',
    },
    reactions: {
      margin: '0 3px',
    }
  }));

  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <div className={classes.topContainer}>
        <p className={classes.username}>{props.activity.username}</p>
        <p className={classes.date}>{props.activity.activity.date}</p>
      </div>
      <div className={classes.descriptionContainer}>
        <p className={classes.description}>{props.activity.activity.text}</p>
      </div>
      <div className={classes.reactionsContainer}>
        <p className={classes.reactions}>😍</p>
        <p className={classes.reactions}>💀</p>
        <p className={classes.reactions}>👍</p>
        <p className={classes.reactions}>👎</p>
        <p className={classes.reactions}>🧠</p>
      </div>
    </Card>
  )
}

export default ActivityCard
