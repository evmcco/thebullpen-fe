import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import { Link } from "react-router-dom";

import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: 'fixed',
    top: '64',
    width: '100%',
  },
  headerBar: {
    backgroundColor: theme.palette.teal,
    fontSize: 14,
    padding: '8px 0',
    textAlign: 'center'
  },
  profileLink: {
    color: theme.palette.grey[50]
  }
}));

export default function TopNav() {
  const [isLinked, setIsLinked] = useState(true)
  const [isClicked, setIsClicked] = useState(false)

  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(async () => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/accesstoken/exists/${user["https://thebullpen.app/username"]}`)
    const data = await response.json()
    setIsLinked(data)
  }, [])

  const classes = useStyles();

  return (
    <>
      {!isLinked && !isClicked &&
        <div className={classes.root}>
          <AppBar className={classes.headerBar} position="static">
            <div>
              <Link className={classes.profileLink} to="/profile" onClick={() => setIsClicked(true)}>Connect your brokerage account to complete setup!</Link>
            </div>
          </AppBar>
        </div>
      }
    </>
  );
}
