import React, { useCallback, useState, useEffect } from 'react';
import Zabo from 'zabo-sdk-js'

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import ZaboAccounts from './ZaboAccounts'

const ZaboConnect = (props) => {
  const [zabo, setZabo] = useState(null)
  const [zaboAccounts, setZaboAccounts] = useState([])
  const [zaboUserId, setZaboUserId] = useState(null)

  useEffect(() => {
    const getZaboAccounts = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/zabo/user/accounts/${props.username}`)
      const data = await response.json()
      if (!!data.error) {
        return
      } else {
        setZaboUserId(data.user_id)
        setZaboAccounts(data.accounts)
      }
    }
    getZaboAccounts()
  }, [])

  useEffect(() => {
    Zabo.init({
      clientId: process.env.REACT_APP_ZABO_CLIENT_ID,
      env: 'live'
    }).then(zabo => {
      setZabo(zabo)
    })
  }, [])

  const useStyles = makeStyles((theme) => ({
    button: {
      backgroundColor: theme.palette.teal,
      color: theme.palette.grey[50],
      marginTop: 8,
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

  const handleConnectClick = () => {
    zabo.connect().onConnection((account) => {
      saveAccountId(account, props.username)
      setZaboAccounts([...zaboAccounts, account])
    }).onError(error => {
      console.error('account connection error:', error)
    })
  }

  const handleDeleteClick = async (accountId) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/zabo/user/${zaboUserId}/accounts/${accountId}`, {
      method: "DELETE"
    })
    const data = await response.json()
    setZaboAccounts(data.accounts)
  }

  return (
    <>
      <Button onClick={() => handleConnectClick()} className={classes.button} variant="contained">
        Beta - Connect your crypto account
      </Button>
      <br />
      <ZaboAccounts zaboAccounts={zaboAccounts} zaboUserId={zaboUserId} handleDeleteClick={handleDeleteClick} />
    </>
  );
};

export default ZaboConnect;