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
      console.log("trending bullpens response", data)
      setTrendingBullpens(data)
    }
    getTrendingBullpens()
  }, [])

  const useStyles = makeStyles({
    root: {
      margin: 50,
      maxWidth: 500,
      minWidth: 275,
    },
  });

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <h1>Trending Bullpens</h1>
        {trendingBullpens.length > 0 ? (
          trendingBullpens.map((bullpen) => (
            <Link to={`/p/${bullpen.username}`}><p>{bullpen.username}</p></Link>
          ))
        ) : (
            <h1>Loading...</h1>
          )}
      </CardContent>
    </Card>
  )
}

