import React, { useCallback, useState, useEffect } from 'react';
import Zabo from 'zabo-sdk-js'

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const ZaboConnect = () => {
  const [zabo, setZabo] = useState(null)

  useEffect(() => {
    Zabo.init({
      clientId: process.env.REACT_APP_ZABO_SANDBOX_CLIENT_ID,
      env: 'sandbox'
    }).then(zabo => {
      console.log(zabo)
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

  const handleClick = () => {
    zabo.connect().onConnection((account) => {
      console.log(account)
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