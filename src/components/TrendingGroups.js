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

  const useStyles = makeStyles({
    root: {
      backgroundColor: '#424242',
      color: '#fafafa',
      margin: 20,
      maxWidth: 600,
      minWidth: 300,
      paddingBottom: '16px'
    },
    content: {
    },
    title: {
      borderBottom: 'solid 1px',
      color: '#ffab00',
      marginTop: 0
    },
    trendingGroupsLink: {
      color: '#f5f5f5'
    }
  });

  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <h2 className={classes.title}>Trending Groups</h2>
        {trendingGroups.length > 0 ? (
          trendingGroups.map((group) => (
            <Link className={classes.trendingGroupsLink} to={`/g/${group.id}`}><p>{group.name}</p></Link>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </CardContent>
    </Card>
  )
}

