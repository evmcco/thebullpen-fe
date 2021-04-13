import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

export default function TrendingGroups() {
  const [trendingGroups, setTrendingGroups] = useState([])

  useEffect(() => {
    const getTrendingGroups = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/all`)
      const data = await response.json()
      setTrendingGroups(data)
    }
    getTrendingGroups()
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
    }
  }));

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <h2 className={classes.title}>Trending Groups</h2>
        {trendingGroups.length > 0 ? (
          trendingGroups.map((group) => (
            <Link key={group.name} className={classes.link} to={`/g/${group.id}`}><p>{group.name}</p></Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
    </Card>
  )
}

