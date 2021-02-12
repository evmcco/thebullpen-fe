import React, { useCallback, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { useAuth0 } from "@auth0/auth0-react";

import Button from '@material-ui/core/Button';


const PlaidLink = () => {
  const [linkToken, setLinkToken] = useState('')
  const [publicToken, setPublicToken] = useState('')
  const [itemState, setItemState] = useState({})

  const { user, isAuthenticated, isLoading } = useAuth0();

  const saveAccessToken = async () => {
    const response = await fetch('/users/update_user_metadata', {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userId: user.sub,
        plaid_access_token: itemState.accessToken
      })
    })
    return response
  }

  const onSuccess = React.useCallback((publicToken) => {
    // send public_token to server
    const setToken = async () => {
      const setTokenUrl = 'plaid/set_access_token'
      const response = await fetch(setTokenUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
        },
        body: `public_token=${publicToken}`
      });
      if (!response.ok) {
        setItemState({
          itemId: `no item_id retrieved`,
          accessToken: `no access_token retrieved`,
          isItemAccess: false,
        });
        return;
      }
      const data = await response.json();
      setItemState({
        itemId: data.item_id,
        accessToken: data.access_token,
        isItemAccess: true,
      });
    };
    setToken();
    saveAccessToken()
  }, []);



  const generateLinkToken = async () => {
    const createLinkTokenUrl = 'plaid/create_link_token'
    const response = await fetch(createLinkTokenUrl, {
      method: "POST"
    })
    const data = await response.json()
    setLinkToken(data.link_token)
  }

  const config = {
    token: linkToken,
    onSuccess,
  };

  const { open, ready, error } = usePlaidLink(config);

  return (
    <>
      <h1>Link your Brokerage Account:</h1>
      <Button onClick={() => generateLinkToken()} color="primary" variant="contained">
        Generate Link Token
      </Button>
      <Button onClick={() => open()} disabled={!ready} color="primary" variant="contained">
        Connect a bank account
      </Button>
    </>
  );
};

export default PlaidLink;