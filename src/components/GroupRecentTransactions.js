import React, { useEffect, useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

export default function GroupRecentTransactions(props) {
  const [transactions, setTransactions] = useState([])

  useEffect(() => {
    const getTransactions = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/data/recenttransactions/${props.groupId}`)
      const data = await response.json()
      setTransactions(data)
    }
    getTransactions()
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
    holdingCard: {
      backgroundColor: theme.palette.grey[900],
      height: 64,
      margin: '8px 0',
      maxWidth: 600,
      // minWidth: 300,
    },
    holdingCardGrid: {
      height: '60px',
      padding: 8
    },
    ticker: {
      color: theme.palette.grey[50]
    },
    holdingCardGridBottomRow: {
      color: theme.palette.grey[700],
      padding: 0,
      width: '100%'
    },
    green: {
      color: '#4caf50'
    },
    red: {
      color: '#f44336'
    },
  }));

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <h2 className={classes.title}>Recent Transactions</h2>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <Card className={classes.holdingCard}>
              <Grid className={classes.holdingCardGrid} container direction="column" justify="space-between" alignItems="stretch">
                <div className={classes.ticker}>{transaction.ticker_symbol}/<span className={transaction.type == 'buy' ? classes.green : classes.red}>{transaction.type}</span></div>
                <Grid className={classes.holdingCardGridBottomRow} container direction="row" justify="space-between" alignItems="center">
                  <div>{transaction.username}</div>
                  <div>{transaction.date}</div>
                </Grid>
              </Grid>
            </Card>

          ))
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
    </Card>
  )
}

