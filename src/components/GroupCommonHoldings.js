import React, { useEffect, useState } from "react";

import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

export default function GroupCommonHoldings(props) {
  const [holdings, setHoldings] = useState([])

  useEffect(() => {
    const getHoldings = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/data/commonholdings/${props.groupId}`)
      const data = await response.json()
      setHoldings(data)
    }
    getHoldings()
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
    holdingCardLeftGrid: {
      width: '75%',
    },
    ticker: {
      color: theme.palette.grey[50]
    },
    name: {
      color: theme.palette.grey[700],
      fontSize: 12
    },
    count: {
      color: theme.palette.grey[700],
      marginRight: 8
    }
  }));

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <h2 className={classes.title}>Common Holdings</h2>
        {holdings.length > 0 ? (
          holdings.map((holding) => (
            <Card className={classes.holdingCard}>
              <Grid className={classes.holdingCardGrid} container direction="row" justify="space-between" alignItems="center">
                <Grid className={classes.holdingCardLeftGrid} container direction="column" justify="center" alignItems="flex-start">
                  <div className={classes.ticker}>{holding.ticker_symbol}</div>
                  <div className={classes.name}>{holding.name.length > 30 ? `${holding.name.substring(0, 30)}...` : holding.name}</div>
                </Grid>
                <div className={classes.count}>{holding.count}</div>
              </Grid>
            </Card>

          ))
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
    </Card >
  )
}

