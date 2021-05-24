import React, { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import HoldingsCards from "./HoldingsCards"
import OptionsTable from "./OptionsTable"
import OptionsCards from "./OptionsCards"
import TransactionsCards from "./TransactionsCards"
import UserGroupsList from "./UserGroupsList"
import UserFollowersList from "./UserFollowersList"
import UserFollowingList from "./UserFollowingList"
import UserInfo from "./UserInfo"

import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
}))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} variant="scrollable" scrollButtons="on" />);

const useStyles = makeStyles((theme) => ({
  portfolioContainer: {
    backgroundColor: theme.palette.grey[900],
    height: '100%',
  },
  tabBar: {
    backgroundColor: theme.palette.grey[900],
    color: theme.palette.grey[50],
    margin: '20px 15px',
    width: 'calc(100% - 30px)',
    position: 'sticky',
    top: '55px',
  },
  tab: {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.7rem'
    },
  },
}));

const Portfolio = ({ match }) => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  let auth0User = isAuthenticated ? user["https://thebullpen.app/username"] : null

  const [holdings, setHoldings] = useState(null)
  const [tabValue, setTabValue] = React.useState(0);

  const [followers, setFollowers] = useState([])
  const [following, setFollowing] = useState([])

  const [isFollowing, setIsFollowing] = useState(null)

  const [auth0Following, setAuth0Following] = useState([])


  const handleTabChange = (event, tabValue) => {
    setTabValue(tabValue);
  };

  useEffect(() => {
    const getHoldings = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/holdings/user/${match.params.username}`)
      const data = await response.json()
      setHoldings(data)
    }
    getHoldings()
  }, [match.params.username])

  // get followers of current portfolio
  useEffect(() => {
    const getUserFollowers = async () => {
      const followersRes = await fetch(`${process.env.REACT_APP_API_URL}/follows/user_followers`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: match.params.username })
      })
      const followersData = await followersRes.json()
      setFollowers(followersData)
    }
    getUserFollowers()

  }, [match.params.username, isFollowing])


  // get followees of current portfolio
  useEffect(() => {
    const getUserFollowees = async () => {
      const followsRes = await fetch(`${process.env.REACT_APP_API_URL}/follows/user_follows`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: match.params.username })
      })
      const followsData = await followsRes.json()
      setFollowing(followsData)
    }
    getUserFollowees()

  }, [match.params.username])

  // get followees of logged in user
  useEffect(() => {
    const getAuth0Follows = async () => {
      const followsRes = await fetch(`${process.env.REACT_APP_API_URL}/follows/user_follows`, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: auth0User })
      })
      const followsData = await followsRes.json()
      setAuth0Following(followsData)
    }
    getAuth0Follows()

  }, [match.params.username, auth0User, isFollowing])


  const classes = useStyles();

  function a11yProps(index) {
    return {
      id: `scrollable-force-tab-${index}`,
      'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
  }

  return (
    <>
      <div className={classes.portfolioContainer}>
        <UserInfo username={match.params.username} followers={followers} following={following} isFollowing={isFollowing} setIsFollowing={setIsFollowing} auth0User={auth0User} auth0Following={auth0Following} handleTabChange={handleTabChange}/>
        <AppBar className={classes.tabBar} position="static">
          <StyledTabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Holdings" className={classes.tab} {...a11yProps(0)}/>
            <Tab label="Transactions" className={classes.tab} {...a11yProps(1)}/>
            <Tab label="Groups" className={classes.tab} {...a11yProps(2)}/>
            <Tab label="Followers" className={classes.tab} {...a11yProps(3)}/>
            <Tab label="Following" className={classes.tab} {...a11yProps(4)}/>
          </StyledTabs>
        </AppBar>
        {holdings &&
          <TabPanel value={tabValue} index={0}>
            <>
              {holdings.equities?.length > 0 && <HoldingsCards username={match.params.username} holdings={holdings.equities} />}
              {holdings.derivatives?.length > 0 && <OptionsCards username={match.params.username} holdings={holdings.derivatives} />}
            </>
          </TabPanel>
        }
        <TabPanel value={tabValue} index={1}>
          <TransactionsCards username={match.params.username} />
        </TabPanel>
        <TabPanel className={classes.groupsContainer} value={tabValue} index={2}>
          <UserGroupsList username={match.params.username} title={"Groups"} />
        </TabPanel>
        <TabPanel className={classes.groupsContainer} value={tabValue} index={3}>
          <UserFollowersList followers={followers} title={"Followers"} username={match.params.username} auth0User={user} />
        </TabPanel>
        <TabPanel className={classes.groupsContainer} value={tabValue} index={4}>
          <UserFollowingList following={following} title={"Following"} username={match.params.username} auth0User={user} />
        </TabPanel>
      </div>
    </>
  )
}

export default Portfolio

