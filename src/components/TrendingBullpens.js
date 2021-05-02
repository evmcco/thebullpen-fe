import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

export default function TrendingBullpens() {
  const [trendingBullpens, setTrendingBullpens] = useState([])

  useEffect(() => {
    const getTrendingBullpens = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/bullpens/trending`)
      const data = await response.json()
      setTrendingBullpens(data)
    }
    getTrendingBullpens()
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

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <h2 className={classes.title}>Trending Bullpens</h2>
        {trendingBullpens.length > 0 ? (
          trendingBullpens.map((bullpen) => (
            <Link key={bullpen.username} className={classes.link} to={`/p/${bullpen.username}`}><p>{bullpen.username}</p></Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
    </Card>
  )
}

