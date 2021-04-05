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
    link: {
      color: theme.palette.grey[50],
    }
  }));

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <h2 className={classes.title}>Trending Groups</h2>
        <div className={classes.titleBorder}>
        </div>
        {trendingGroups.length > 0 ? (
          trendingGroups.map((group) => (
            <Link className={classes.link} to={`/g/${group.id}`}><p>{group.name}</p></Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
    </Card>
  )
}

