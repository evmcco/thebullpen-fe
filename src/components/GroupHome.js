import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

import { useAuth0 } from "@auth0/auth0-react";

import TopNav from "./TopNav"
import GroupJoinLeave from "./GroupJoinLeave"

export default function GroupHome({ match }) {
  const [groupUsers, setGroupUsers] = useState([])
  const [groupDetails, setGroupDetails] = useState([])
  const [memberOf, setMemberOf] = useState(false)

  const { user, isAuthenticated, isLoading } = useAuth0();

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
    headerCard: {
      backgroundColor: '#424242',
      color: '#fafafa',
      minHeight: 173,
      margin: "84px 20px 20px 20px"
    },
    heading: {
      textAlign: 'left',
    },
    root: {
      backgroundColor: '#424242',
      color: '#fafafa',
      margin: 20,
      maxWidth: 600,
      minWidth: 300,
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
      {!!groupDetails && !!groupUsers &&
        <div className={classes.main}>
          <TopNav />
          <Card className={classes.headerCard}>
            <CardContent>
              <div className={classes.heading}>
                <h1 className={classes.title}>{groupDetails.name}</h1>
                <p>{groupDetails.description}</p>
                {!!isAuthenticated && <GroupJoinLeave username={user["https://thebullpen.app/username"]} groupId={match.params.groupId} />}
              </div>
            </CardContent>
          </Card>
          <Card className={classes.root}>
            <CardContent className={classes.content}>
              <h2 className={classes.title}>Members</h2>
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

