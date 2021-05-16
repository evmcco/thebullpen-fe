import React, { useEffect, useState } from "react";

import HoldingsCards from "./HoldingsCards"
import OptionsTable from "./OptionsTable"
import OptionsCards from "./OptionsCards"
import TransactionsCards from "./TransactionsCards"
import UserGroupsList from "./UserGroupsList"
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

const Portfolio = ({ match }) => {
  const [holdings, setHoldings] = useState(null)
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, tabValue) => {
    setTabValue(tabValue);
  };

  useEffect(() => {
    const getHoldings = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/holdings/user/${match.params.username}`)
      const data = await response.json()
      setHoldings(data)
    }
    getHoldings()
  }, []
  )

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

  const classes = useStyles();

  return (
    <>
      <div className={classes.portfolioContainer}>
        <UserInfo username={match.params.username} />
        <AppBar className={classes.tabBar} position="static">
          <StyledTabs value={tabValue} onChange={handleChange}>
            <Tab label="Holdings" className={classes.tab}/>
            <Tab label="Transactions" className={classes.tab}/>
            <Tab label="Groups" className={classes.tab}/>
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
      </div>
    </>
  )
}

export default Portfolio

