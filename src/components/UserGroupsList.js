import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

export default function UserGroupsList(props) {
  const [myGroups, setMyGroups] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getMyGroups = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/user/all/${props.username}`)
      const data = await response.json()
      setMyGroups(data)
      setLoading(false)
    }
    getMyGroups()
  }, [])

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
    }
  }));

  const classes = useStyles();
  if (!loading) {
    return (
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <h2 className={classes.title}>{props.title}</h2>
          {myGroups.length > 0 ? (
            myGroups.map((group) => (
              <Link key={group.id} className={classes.link} to={`/g/${group.id}`}><p>{group.name}</p></Link>
            ))
          ) : (
            <p>{props.title === "My Groups" ? "You don't " : <><strong>{props.username}</strong> doesn't</> } belong to any groups yet.</p>
          )}
        </CardContent>
      </Card>
    )
  } else {
    return <Card className={classes.root}>
      <CardContent className={classes.content}><p>Loading...</p></CardContent>
      </Card>
  }
}

