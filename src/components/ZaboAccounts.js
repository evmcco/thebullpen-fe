import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';


export default function ZaboAccounts(props) {
  const [zaboAccounts, setZaboAccounts] = useState([])
  const [zaboUserId, setZaboUserId] = useState(null)

  useEffect(() => {
    const getZaboAccounts = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/zabo/user/accounts/${props.username}`)
      const data = await response.json()
      setZaboUserId(data.user_id)
      setZaboAccounts(data.accounts)
    }
    getZaboAccounts()
  }, [])

  const useStyles = makeStyles((theme) => ({
    root: {
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.grey[50],
      margin: 20,
      maxWidth: 600,
      minWidth: 300,
      paddingBottom: '16px'
    },
    content: {
    },
    title: {
      borderBottom: 'solid 1px',
      color: theme.palette.grey[50],
      marginTop: 0
    },
    link: {
      color: theme.palette.grey[50],
      textDecoration: 'none'
    }
  }));

  const classes = useStyles();

  const handleClick = async (accountId) => {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/zabo/user/${zaboUserId}/accounts/${accountId}`, {
      method: "DELETE"
    })
    const data = await response.json()
    setZaboAccounts(data.accounts)
  }

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <h2 className={classes.title}>Crypto Accounts</h2>
        {zaboAccounts.length > 0 ? (
          zaboAccounts.map((account) => (
            <>
              <div>
                <span>{account.provider.display_name}   </span>
                <Button onClick={() => handleClick(account.id)} className={classes.button} variant="contained">Disconnect</Button>
              </div>
            </>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
    </Card>
  )
}

