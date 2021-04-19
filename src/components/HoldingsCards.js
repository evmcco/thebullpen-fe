import React, { useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';

import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

export default function HoldingsCards(props) {
  const useStyles = makeStyles((theme) => ({
    card: {
      backgroundColor: theme.palette.navy,
      borderRadius: 20,
      boxShadow: '0px 0px 10px 0px black',
      color: theme.palette.grey[50],
      margin: '1em auto',
      maxWidth: 850
    },
    holdingCard: {
      backgroundColor: 'rgb(71,48,120)',
      height: 80,
      margin: '8px auto',
      maxWidth: 400,
      minWidth: 250
    },
    holdingCardGrid: {
      height: 80,
      padding: 12
    },
    gridItemLeft: {
      backgroundColor: theme.palette.navy,
      borderRadius: 5,
      color: theme.palette.common.white,
      fontSize: 15,
      height: 56,
      textAlign: 'center',
      width: 56
    },
    tickerLink: {
      color: theme.palette.common.white,
      fontWeight: 'bold',
      textDecoration: 'none'
    },
    gridContainerMid: {
      color: theme.palette.common.white,
      fontWeight: 'bold',
      fontSize: 13,
      height: 56,
      width: '40%'
    },
    gridMid: {
      height: '100%',
      width: '100%'
    },
    gridItemRight: {
      backgroundColor: theme.palette.navy,
      borderRadius: 7,
      fontSize: 15,
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
                  <div className={classes.gridContainerMid}>
                    <Grid className={classes.gridMid} container direction="column" justify="space-around" alignItems="flex-start">
                      <div>${holding.currentPrice}</div>
                      <div>{holding.weight} wt</div>
                      <div>{holding.profit}</div>
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


