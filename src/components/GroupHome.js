import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

import { makeStyles, withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { useAuth0 } from "@auth0/auth0-react";

import GroupJoinLeave from "./GroupJoinLeave"
import GroupCommonHoldings from "./GroupCommonHoldings"
import GroupRecentTransactions from "./GroupRecentTransactions"

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        [children]
      )}
    </div>
  );
}

export default function GroupHome({ match }) {
  const [groupUsers, setGroupUsers] = useState([])
  const [groupDetails, setGroupDetails] = useState([])
  const [memberOf, setMemberOf] = useState(false)
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, tabValue) => {
    setTabValue(tabValue);
  };

  const { user, isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    const getGroupDetails = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/details/${match.params.groupId}`)
      const data = await response.json()
      setGroupDetails(data[0])
    }
    getGroupDetails()
  }, [])

  useEffect(() => {
    const getGroupUsers = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/groups/members/${match.params.groupId}`)
      const data = await response.json()
      setGroupUsers(data)
    }
    getGroupUsers()
  }, [])

  const StyledTabs = withStyles((theme) => ({
    indicator: {
      display: 'flex',
      justifyContent: 'center',
      backgroundColor: 'transparent',
      '& > span': {
        width: '100%',
        backgroundColor: theme.palette.lilac,
      },
    },
  }))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

  const useStyles = makeStyles((theme) => ({
    main: {
      backgroundColor: theme.palette.grey[900],
      height: '100vh',
    },
    tabBar: {
      backgroundColor: theme.palette.grey[900],
      color: theme.palette.grey[50],
      margin: '8px 20px 0 20px',
      width: 'calc(100% - 40px)'
    },
    headerCard: {
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.grey[50],
      minHeight: 173,
      margin: 20
    },
    heading: {
      textAlign: 'left',
    },
    root: {
      backgroundColor: theme.palette.grey[800],
      color: theme.palette.grey[50],
      margin: 20,
      maxWidth: 600,
      minWidth: 300,
    },
    title: {
      borderBottom: 'solid 1px',
      color: theme.palette.grey[50],
      marginTop: 0
    },
    description: {
      color: theme.palette.grey[50]
    },
    memberLink: {
      color: '#f5f5f5'
    }
  }));

  const classes = useStyles();

  return (
    <div className={classes.main}>
      {!!groupDetails && !!groupUsers &&
        <div>
          <Card className={classes.headerCard}>
            <CardContent>
              <div className={classes.heading}>
                <h1 className={classes.title}>{groupDetails.name}</h1>
                <p className={classes.description}>{groupDetails.description}</p>
                {!!isAuthenticated && <GroupJoinLeave username={user["https://thebullpen.app/username"]} groupId={match.params.groupId} />}
              </div>
            </CardContent>
          </Card>
          <AppBar className={classes.tabBar} position="static">
            <StyledTabs value={tabValue} onChange={handleChange}>
              <Tab label="Members" />
              <Tab label="Holdings" />
              <Tab label="Transactions" />
            </StyledTabs>
          </AppBar>
          <TabPanel value={tabValue} index={0}>
            <Card className={classes.root}>
              <CardContent className={classes.content}>
                <h2 className={classes.title}>Members</h2>
                {groupUsers.length > 0 ? (
                  groupUsers.map((user) => (
                    <Link key={user.username} className={classes.memberLink} to={`/p/${user.username}`}><p>{user.username}</p></Link>
                  ))
                ) : (
                  <p>Loading...</p>
                )}
              </CardContent>
            </Card>
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            <GroupCommonHoldings groupId={match.params.groupId} />
          </TabPanel>
          <TabPanel className={classes.groupsContainer} value={tabValue} index={2}>
            <GroupRecentTransactions groupId={match.params.groupId} />
          </TabPanel>

        </div>
      }
    </div>
  )
}

