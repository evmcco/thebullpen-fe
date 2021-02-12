import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';


import TopNav from './TopNav.js'
import PlaidLink from './PlaidLink'

const UserSetup = () => {
  const [usernameInput, setUsernameInput] = useState('')

  const { user, isAuthenticated, isLoading } = useAuth0();

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  const classes = useStyles();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  let user_metadata = {}
  if (user["https://thebullpen.app/user/user_metadata"]) { user_metadata = user["https://thebullpen.app/user/user_metadata"] }

  const handleUsernameSubmit = async (e) => {
    e.preventDefault()
    console.log("USERNAME INPUT", usernameInput)
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
    console.log("USERNAME SAVE RESPONSE", response)
    return response
  }

  //submit username form and Plaid Link
  return (
    <>
      {isAuthenticated && !user_metadata.username && (
        <form className={classes.root} noValidate autoComplete="off" onSubmit={e => { handleUsernameSubmit(e) }}>
          <TextField id="standard-basic" label="Username" onChange={e => setUsernameInput(e.target.value)} />
          <br />
          <Button type="submit" color="primary" variant="contained">Reserve Username</Button>
        </form>

      )}
      {isAuthenticated && !user_metadata.plaid_access_token && (
        <PlaidLink />
      )}
    </>
  );
};

export default UserSetup;