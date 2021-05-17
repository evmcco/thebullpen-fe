import React, { useCallback, useState, useEffect } from 'react';
import Zabo from 'zabo-sdk-js'

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const ZaboConnect = (props) => {
  const [zabo, setZabo] = useState(null)

  useEffect(() => {
    Zabo.init({
      clientId: process.env.REACT_APP_ZABO_SANDBOX_CLIENT_ID,
      env: 'sandbox'
    }).then(zabo => {
      setZabo(zabo)
    })
  }, [])

  const useStyles = makeStyles((theme) => ({
    button: {
      backgroundColor: theme.palette.teal,
      color: theme.palette.grey[50],
    }
  }));

  const classes = useStyles();

  const saveAccountId = async (account, username) => {
    const url = `${process.env.REACT_APP_API_URL}/zabo/save_account_id`
    const response = await fetch(url, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        account,
        username
      })
    })
  }

  const handleClick = () => {
    zabo.connect().onConnection((account) => {
      console.log(account)
      saveAccountId(account, props.username)
    }).onError(error => {
      console.error('account connection error:', error)
    })
  }

  return (
    <>
      <Button onClick={() => handleClick()} className={classes.button} variant="contained">
        Connect your crypto account
      </Button>
    </>
  );
};

export default ZaboConnect;