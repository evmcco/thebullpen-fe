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

  const useStyles = makeStyles({
    root: {
      backgroundColor: '#424242',
      color: '#fafafa',
      margin: 50,
      maxWidth: 500,
      minWidth: 275,
    },
    content: {
      marginBottom: '-8px'
    },
    title: {
      borderBottom: 'solid 1px',
      color: '#ffab00',
      marginTop: 0
    },
    trendingBullpenLink: {
      color: '#f5f5f5'
    }
  });

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <h2 className={classes.title}>Trending Bullpens</h2>
        {trendingBullpens.length > 0 ? (
          trendingBullpens.map((bullpen) => (
            <Link className={classes.trendingBullpenLink} to={`/p/${bullpen.username}`}><p>{bullpen.username}</p></Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
    </Card>
  )
}

