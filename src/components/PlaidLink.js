import React, { useCallback, useState } from 'react';
import { usePlaidLink } from 'react-plaid-link';

import Button from '@material-ui/core/Button';


const PlaidLink = () => {
  const [linkToken, setLinkToken] = useState('')
  const [publicToken, setPublicToken] = useState('')
  const [itemState, setItemState] = useState({})

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
  }, []);

  const config = {
    token: linkToken,
    onSuccess,
  };

  const generateLinkToken = async () => {
    const createLinkTokenUrl = 'plaid/create_link_token'
    const response = await fetch(createLinkTokenUrl, {
      method: "POST"
    })
    const data = await response.json()
    setLinkToken(data.link_token)
  }

  const { open, ready, error } = usePlaidLink(config);

  return (
    <>
      <Button onClick={() => generateLinkToken()}>
        Generate Link Token
      </Button>
      <Button onClick={() => open()} disabled={!ready}>
        Connect a bank account
      </Button>
    </>
  );
};

export default PlaidLink;