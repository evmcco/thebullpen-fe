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
    titleBorder: {
      background: 'rgb(0, 117, 128)',
      background: 'linear-gradient(90deg, rgba(10,34,64,1) 0%, rgba(0,117,128,1) 100%)',
      height: 3,
      width: '100%'
    },
    title: {
      color: theme.palette.grey[50],
      marginTop: 0,
      marginBottom: 3
    },
    holdingCard: {
      backgroundColor: theme.palette.grey[900],
      margin: '8px 0',
      maxWidth: 300,
      padding: '8px 8px 0 8px'
    },
    holdingCardGrid: {
      height: '100%'
    },
    ticker: {
      color: theme.palette.grey[50]
    },
    holdingCardGridBottomRow: {
      color: theme.palette.grey[700],
      width: '100%'
    },
    date: {
      color: theme.palette.grey[700]
    }
  }));

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <h2 className={classes.title}>Recent Transactions</h2>
        <div className={classes.titleBorder}>
        </div>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <Card className={classes.holdingCard}>
              <CardContent>
                <Grid clasName={classes.holdingCardGrid} container direction="column" justify="space-between" alignItems="stretch">
                  <div className={classes.ticker}>{transaction.ticker_symbol}/{transaction.type}</div>
                  <Grid className={classes.holdingCardGridBottomRow} container direction="row" justify="space-between" alignItems="center">
                    <div>{transaction.date}</div>
                    <div>{transaction.username}</div>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

          ))
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
    </Card>
  )
}

