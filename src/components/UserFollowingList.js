import React, { useContext } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

import UsernameWithAchivements from './UsernameWithAchivements'

import { FollowsContext } from "../contexts/FollowsContext"

export default function UserFollowingList(props) {
  const followsContext = useContext(FollowsContext)

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
    },
    followees: {
      margin: '8px 0',
    }
  }));

  const classes = useStyles();

    return (
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <h2 className={classes.title}>{props.title}</h2>
          <div className={classes.listContainer}>
            {followsContext.following.length > 0 ? (
              followsContext.following.map((followee) => (
                <Link key={followee.follow_id} className={classes.link} to={`/p/${followee.followee_username}`}>
                  <div className={classes.followees}>
                    <UsernameWithAchivements username={followee.followee_username} />
                  </div>
                </Link>
              ))
            ) : (
              <p className={classes.followees}>{props.auth0User === props.username ? "You aren't " : <><strong>{props.username}</strong> isn't</> } following anyone yet.</p>
            )}
          </div>
        </CardContent>
      </Card>
    )
}

