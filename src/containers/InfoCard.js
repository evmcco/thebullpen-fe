import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';



export default function InfoCard(props) {
  const useStyles = makeStyles((theme) => ({
    holdingCard: {
      backgroundColor: theme.palette.grey[800],
      borderRadius: 10,
      height: 80,
      margin: '8px auto',
      maxWidth: 400,
      // minWidth: 250
    },
    holdingCardGrid: {
      height: 80,
      padding: 12
    },
    gridItemLeft: {
      backgroundColor: theme.palette.grey[900],
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
      width: '100%',
      flexWrap: 'nowrap',
      [theme.breakpoints.down('xs')]: {
        fontSize: '.9em',
      },

    },
    gridItemRight: {
      backgroundColor: theme.palette.grey[900],
      borderRadius: 7,
      fontSize: 15,
      fontWeight: 'bold',
      width: '30%',
    },
    green: {
      color: theme.palette.positive
    },
    red: {
      color: theme.palette.negative
    },
    white: {
      color: theme.palette.common.white
    }
  }));

  const classes = useStyles();

  return (
    <Card className={classes.holdingCard}>
      <Grid className={classes.holdingCardGrid} container direction="row" justify="space-between" alignItems="center">
        <div className={classes.gridItemLeft}>
          <Grid className={classes.gridItemLeft} container direction="row" justify="center" alignItems="center">
            <a
              className={classes.tickerLink}
              target="_blank"
              href={`https://finance.yahoo.com/quote/${props.left}`}
            >
              {props.left}
            </a>
          </Grid>
        </div>
        <div className={classes.gridContainerMid}>
          <Grid className={classes.gridMid} container direction="column" justify="center" alignItems="flex-start">
            {props.mid.map((e) => {
              return <div key={e}>{e}</div>
            })}
          </Grid>
        </div>
        <div className={classes.gridItemRight}>
          <Grid container direction="row" justify="center" alignItems="center">
            <div className={classes[`${props.right.color}`]}>{props.right.data}</div>
          </Grid>
        </div>
      </Grid>
    </Card>
  )
}


