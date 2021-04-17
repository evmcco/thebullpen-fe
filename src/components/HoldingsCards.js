import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

export default function HoldingsCards(props) {
  const useStyles = makeStyles((theme) => ({
    card: {
      backgroundColor: theme.palette.navy,
      color: theme.palette.grey[50],
      margin: '1em 5% 0 5%',
      maxWidth: '90%',
    },
    holdingCard: {
      backgroundColor: theme.palette.purple,
      height: 64,
      margin: '8px 0',
      maxWidth: 600,
      minWidth: 300,
    },
    holdingCardGrid: {
      height: 64,
      padding: 8
    },
    gridItemLeft: {
      backgroundColor: theme.palette.navy,
      borderRadius: 5,
      color: theme.palette.common.white,
      fontSize: 13,
      height: 48,
      textAlign: 'center',
      width: 48
    },
    tickerLink: {
      color: theme.palette.common.white,
      fontWeight: 'bold',
      textDecoration: 'none'
    },
    gridItemMid: {
      color: theme.palette.common.white,
      fontSize: 13,
      height: '100%',
      width: '40%'
    },
    gridItemRight: {
      backgroundColor: theme.palette.navy,
      borderRadius: 7,
      fontWeight: 'bold',
      width: '30%',
    },
    green: {
      color: theme.palette.teal
    },
    red: {
      color: '#f44336'
    },
  }));

  const classes = useStyles();

  return (
    props.holdings && props.holdings.length > 0 ? (
      <Card className={classes.card}>
        <CardContent>
          {props.holdings.map((holding) => {
            return (
              <Card key={holding.ticker} className={classes.holdingCard}>
                <Grid className={classes.holdingCardGrid} container direction="row" justify="space-between" alignItems="center">
                  <div className={classes.gridItemLeft}>
                    <Grid className={classes.gridItemLeft} container direction="row" justify="center" alignItems="center">
                      <a
                        className={classes.tickerLink}
                        target="_blank"
                        href={holding.href}
                      >
                        {holding.ticker_symbol}
                      </a>
                    </Grid>
                  </div>
                  <div className={classes.gridItemMid}>
                    <Grid className={classes.subGrid} container direction="column" justify="space-around" alignItems="flex-start">
                      <div>${holding.currentPrice}</div>
                      <div className={classes.weight}>{holding.weight} wt.</div>
                      <div className={classes.profit}>{holding.profit}</div>
                    </Grid>
                  </div>
                  <div className={classes.gridItemRight}>
                    <Grid container direction="row" justify="center" alignItems="center">
                      <div className={holding.change > 0 ? classes.green : holding.change < 0 ? classes.red : null}>{holding.change}%</div>
                    </Grid>
                  </div>
                </Grid>
              </Card>
            )
          })}
        </CardContent >
      </Card >
    ) : null
  )
}


