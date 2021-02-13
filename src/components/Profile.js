import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import TopNav from './TopNav.js'
import UserSetup from './UserSetup'

import Button from '@material-ui/core/Button';

import { requestPlaidHoldings } from "../services/plaid.js"

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  let user_metadata = {}
  if (user["https://thebullpen.app/user/user_metadata"]) { user_metadata = user["https://thebullpen.app/user/user_metadata"] }



  return (
    isAuthenticated && (
      <>
        <TopNav />
        <div>
          <img src={user.picture} alt={user.name} />
          <br />
          {user_metadata.username && user_metadata.plaid_access_token && <Button onClick={() => requestPlaidHoldings(user_metadata.username, user_metadata.plaid_access_token)} variant="contained" color="secondary">Refresh Holdings Data</Button>}
          <h2>Name: {user.name}</h2>
          <p>Email Address: {user.email}</p>
        </div>
        <UserSetup />
      </>
    )
  );
};

export default Profile;