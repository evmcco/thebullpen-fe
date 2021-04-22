import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';


export default function CardsList(props) {
  const useStyles = makeStyles((theme) => ({
    cardContainer: {
      backgroundColor: theme.palette.grey[900],
      color: theme.palette.grey[50],
      margin: '1em auto',
      width: '90%'
    }
  }));

  const classes = useStyles();

  return (
    <Card className={classes.cardContainer}>
      <CardContent>
        {props.children}
      </CardContent >
    </Card >
  )
}


