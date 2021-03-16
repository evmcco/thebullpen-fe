import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import TopNav from './TopNav.js'
import PlaidLink from './PlaidLink.js'

import Button from '@material-ui/core/Button';

import { requestPlaidHoldings } from "../services/plaid.js"

const Profile = () => {
  const [accessTokens, setAccessTokens] = useState([])

  const { user, isAuthenticated, isLoading } = useAuth0();

  const getAccessTokens = async (username) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/get_access_tokens/${username}`)
    const data = await response.json()
    setAccessTokens(data)
  }

  useEffect(async () => {
    if (user) {
      await getAccessTokens(user["https://thebullpen.app/username"])
    }
  }, [])

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    isAuthenticated && (
      <>
        <TopNav />
        <div>
          <img src={user.picture} alt={user.name} />
          <br />
          <h2>Name: {user.name}</h2>
          <p>Email Address: {user.email}</p>
          <p>Username: {user["https://thebullpen.app/username"]}</p>
        </div>
        <PlaidLink username={user["https://thebullpen.app/username"]} />
        {/* TODO only show button if user has access_token, eventually display all Items with separate buttons (for testing) */}
        <br />
        {!!accessTokens.length &&
          <Button onClick={() => accessTokens.forEach((accessToken) => {
            requestPlaidHoldings(
              accessToken.item_id,
              user["https://thebullpen.app/username"],
              accessToken.access_token)
          })}
            variant="contained" color="secondary">Refresh Holdings Data</Button>
        }
      </>
    )
  );
};

export default Profile;