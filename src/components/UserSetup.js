import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import TopNav from './TopNav.js'
import PlaidLink from './PlaidLink'

const UserSetup = () => {
  const [userMetadata, setUserMetadata] = useState({})
  const [usernameInput, setUsernameInput] = useState('')
  const [usernameSaved, setusernameSaved] = useState(false)
  const [usernameExists, setUsernameExists] = useState()

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  const classes = useStyles();

  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (user["https://thebullpen.app/user/user_metadata"].username) {
      setUserMetadata(user["https://thebullpen.app/user/user_metadata"])
    }
  }, [userMetadata]);

  const saveUsername = async (username) => {
    const response = await fetch('/users/username/save', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username
      })
    })
    return response
  }

  const doesUsernameExist = async (username) => {
    const response = await fetch(`/users/username/exists/${username}`, {
      method: "GET",
    })
    const data = await response.json()
    setUsernameExists(data)
    return data
  }

  const handleUsernameSubmit = async (e) => {
    e.preventDefault()
    const exists = await doesUsernameExist(usernameInput)
    if (!exists) {
      saveUsername(usernameInput)
      const response = await fetch('/users/update_user_metadata', {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: user.sub,
          username: usernameInput
        })
      })
      const data = await response.json()
      setUserMetadata(data.user_metadata)
    }
  }

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  //submit username form and Plaid Link
  return (
    <>
      {isAuthenticated && !userMetadata.username && !usernameExists && (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={e => { handleUsernameSubmit(e) }}>
          <TextField id="standard-basic" label="Username" value={usernameInput} onChange={e => setUsernameInput(e.target.value.toLowerCase())} />
          <br />
          <Button type="submit" color="primary" variant="contained">Reserve Username</Button>
        </form>
      )}
      {isAuthenticated && !userMetadata.username && usernameExists && (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={e => { handleUsernameSubmit(e) }}>
          <TextField error helperText="Username Taken" id="standard-basic" label="Username" value={usernameInput} onChange={e => setUsernameInput(e.target.value.toLowerCase())} />
          <br />
          <Button type="submit" color="primary" variant="contained">Reserve Username</Button>
        </form>
      )}
      {isAuthenticated && userMetadata.username && (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={e => { handleUsernameSubmit(e) }}>
          <TextField disabled id="standard-basic" label="Username" defaultValue={userMetadata.username} onChange={e => setUsernameInput(e.target.value)} />
        </form>
      )}
      {isAuthenticated && userMetadata.username && !userMetadata.plaid_access_token && (
        <PlaidLink userMetadata={userMetadata} />
      )}
    </>
  );
};

export default UserSetup;