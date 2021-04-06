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
    count: {
      color: theme.palette.grey[700]
    }
  }));

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <h2 className={classes.title}>Common Holdings</h2>
        <div className={classes.titleBorder}>
        </div>
        {holdings.length > 0 ? (
          holdings.map((holding) => (
            <Card className={classes.holdingCard}>
              <CardContent>
                <Grid clasName={classes.holdingCardGrid} container direction="row" justify="space-between" alignItems="center">
                  <div className={classes.ticker}>{holding.ticker_symbol}</div>
                  <div className={classes.count}>{holding.count}</div>
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

