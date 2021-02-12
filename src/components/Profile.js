import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import TopNav from './TopNav.js'
import PlaidLink from './PlaidLink'

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
        <PlaidLink />
        <div>
          <img src={user.picture} alt={user.name} />
          <h2>Name: {user.name}</h2>
          <p>Email Address: {user.email}</p>
          {user_metadata && user_metadata.username && <p>Username: {user_metadata.username}</p>}
        </div>
      </>
    )
  );
};

export default Profile;