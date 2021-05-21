import React from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

import UsernameWithAchivements from './UsernameWithAchivements'

export default function UserFollowersList(props) {

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.grey[50],
      margin: '20px 15px',
      maxWidth: 600,
      paddingBottom: '16px'
    },
    title: {
      borderBottom: 'solid 1px',
      color: theme.palette.grey[50],
      marginTop: 0
    },
    link: {
      color: theme.palette.grey[50],
      textDecoration: 'none'
    },
    listContainer: {
      display: 'flex',
      flexDirection: 'column'
    }
  }));

  const classes = useStyles();

    return (
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <h2 className={classes.title}>{props.title}</h2>
          <div className={classes.listContainer}>
            {props.followers.length > 0 ? (
              props.followers.map((follower) => (
                <Link key={follower.follow_id} className={classes.link} to={`/p/${follower.follower_username}`}>
                  <UsernameWithAchivements username={follower.follower_username} />
                </Link>
              ))
            ) : (
              <p>{props.auth0User === props.username ? "You don't " : <><strong>{props.username}</strong> doesn't</> } have any followers yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    )
}

