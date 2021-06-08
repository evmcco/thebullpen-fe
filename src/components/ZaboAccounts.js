import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';


export default function ZaboAccounts(props) {
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

  if (props.zaboAccounts.length > 0) {
    return (
      <Card className={classes.root}>
        <CardContent className={classes.content}>
          <h2 className={classes.title}>Crypto Accounts</h2>
          {props.zaboAccounts.map((account) => (
            <div key={account.id}>
              <span>{account.provider.display_name}   </span>
              <Button onClick={() => props.handleDeleteClick(account.id)} className={classes.button} variant="contained">Disconnect</Button>
            </div>
          ))
          }
        </CardContent>
      </Card>
    )
  } else {
    return null
  }
}

