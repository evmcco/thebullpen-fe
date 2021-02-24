import React, { useCallback, useState, useEffect } from 'react';
import { usePlaidLink } from 'react-plaid-link';
import { useAuth0 } from "@auth0/auth0-react";

import Button from '@material-ui/core/Button';

import { requestPlaidHoldings } from "../services/plaid.js"

const PlaidLink = (props) => {
  const [linkToken, setLinkToken] = useState('')
  const [itemState, setItemState] = useState({})

  useEffect(() => {
    if (!linkToken) {
      generateLinkToken()
    }
  }, [linkToken])

  const saveAccessToken = async (access_token, item_id) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/users/save_access_token`, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: props.username,
        plaid_access_token: access_token,
        item_id: item_id
      })
    })
    return response
  }

  const onSuccess = React.useCallback((publicToken) => {
    // send public_token to server
    const setTokenSaveTokenRequestHoldings = async () => {
      const setTokenUrl = `${process.env.REACT_APP_API_URL}/plaid/set_access_token`
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
      saveAccessToken(data.access_token, data.item_id)
      requestPlaidHoldings(props.username, data.access_token)
    };
    setTokenSaveTokenRequestHoldings();
    //TODO send username and access_token to API for Plaid data fetching
  }, []);

  const generateLinkToken = async () => {
    const createLinkTokenUrl = `${process.env.REACT_APP_API_URL}/plaid/create_link_token`
    const response = await fetch(createLinkTokenUrl, {
      method: "POST"
    })
    const data = await response.json()
    await setLinkToken(data.link_token)
    open()
  }

  const config = {
    token: linkToken,
    onSuccess,
  };

  const { open, ready, error } = usePlaidLink(config);

  return (
    <>
      <h2>Link your Brokerage Account:</h2>
      <Button onClick={() => open()} disabled={!ready} color="primary" variant="contained">
        Connect a bank account
      </Button>
    </>
  );
};

export default PlaidLink;