import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

import TopNav from "./TopNav"

export default function GroupHome({ match }) {
  const [groupUsers, setGroupUsers] = useState([])
  const [groupDetails, setGroupDetails] = useState([])

  useEffect(() => {
    const getGroupDetails = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/details/${match.params.groupId}`)
      const data = await response.json()
      setGroupDetails(data[0])
    }
    getGroupDetails()
  }, [])

  useEffect(() => {
    const getGroupUsers = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/members/${match.params.groupId}`)
      const data = await response.json()
      setGroupUsers(data)
    }
    getGroupUsers()
  }, [])

  const useStyles = makeStyles({
    heading: {
      height: 115,
      paddingTop: '64px',
      textAlign: 'center',
    },
    root: {
      backgroundColor: '#424242',
      color: '#fafafa',
      margin: 20,
      maxWidth: 600,
      minWidth: 300,
      paddingBottom: '16px'
    },
    title: {
      borderBottom: 'solid 1px',
      color: '#ffab00',
      marginTop: 0
    },
    trendingGroupsLink: {
      color: '#f5f5f5'
    },
  });

  const classes = useStyles();

  return (
    <>
      <TopNav />
      {!!groupDetails && !!groupUsers &&
        <div className={classes.main}>
          <div className={classes.heading}>
            <h1>{groupDetails.name}</h1>
            <h2>{groupDetails.description}</h2>
          </div>
          <Card className={classes.root}>
            <CardContent className={classes.content}>
              <h2 className={classes.title}>Users</h2>
              {groupUsers.length > 0 ? (
                groupUsers.map((user) => (
                  <Link className={classes.trendingGroupsLink} to={`/p/${user.username}`}><p>{user.username}</p></Link>
                ))
              ) : (
                <p>Loading...</p>
              )}
            </CardContent>
          </Card>
        </div>
      }
    </>
  )
}

