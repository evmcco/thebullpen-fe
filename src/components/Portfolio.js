import React, { useEffect, useState } from "react";

import HoldingsTable from "./HoldingsTable"
import OptionsTable from "./OptionsTable"
import TransactionsTable from "./TransactionsTable"
import UserGroupsList from "./UserGroupsList"
import UserInfo from "./UserInfo"
import TopNav from "./TopNav"
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
  const [holdings, setHoldings] = useState([])
  const [totalPortfolioValue, setTotalPortfolioValue] = useState(0)
  const [tabValue, setTabValue] = React.useState(0);

  const handleChange = (event, tabValue) => {
    setTabValue(tabValue);
  };

  useEffect(() => {
    const getHoldings = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/holdings/user/${match.params.username}`)
      const data = await response.json()
      getTotalPortfolioValue(data)
      data.sort((a, b) => {
        if (a.type == 'cash' || a.type == 'other' || a.ticker_symbol == 'CUR:BTC') {
          return 1
        } else if (b.type == 'cash' || b.type == 'other' || b.ticker_symbol == 'CUR:BTC') {
          return -1
        } else {
          return (a.ticker_symbol < b.ticker_symbol) ? -1 : (a.ticker_symbol > b.ticker_symbol) ? 1 : 0
        }
      })
      setHoldings(data)
    }
    getHoldings()
  }, []
  )

  const getTotalPortfolioValue = (h) => {
    const reducer = (accumulator, currentValue) => {
      if (currentValue.ticker_symbol == 'CUR:USD') {
        return Number(accumulator) + Number(currentValue.quantity)
      }
      const holdingPrice = !!currentValue.quote?.latestPrice ? currentValue.quote.latestPrice : Number(currentValue.close_price)
      const totalHoldingValue = holdingPrice * Number(currentValue.quantity)
      return Number(accumulator) + totalHoldingValue
    }
    setTotalPortfolioValue(h.reduce(reducer, 0).toFixed(2))
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
  }))((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

  const useStyles = makeStyles((theme) => ({
    portfolioContainer: {
      backgroundColor: theme.palette.grey[900],
      height: '100%',
      paddingTop: '64px',
    },
    tabBar: {
      backgroundColor: theme.palette.grey[900],
      color: theme.palette.grey[50],
      margin: '8px 5% 0 5%',
      width: '90%'
    },
    groupsContainer: {
      marginLeft: 'calc(5% - 20px)'
    }
  }));

  const classes = useStyles();

  return (
    <>
      <TopNav />
      <div className={classes.portfolioContainer}>
        <UserInfo username={match.params.username} />
        <AppBar className={classes.tabBar} position="static">
          <StyledTabs value={tabValue} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Holdings" />
            <Tab label="Transactions" />
            <Tab label="Groups" />
          </StyledTabs>
        </AppBar>
        <TabPanel value={tabValue} index={0}>
          <>
            <HoldingsTable username={match.params.username} holdings={holdings.filter((holding) => { return holding.type != "derivative" })} totalPortfolioValue={totalPortfolioValue} />
            <OptionsTable username={match.params.username} holdings={holdings.filter((holding) => { return holding.type == "derivative" })} totalPortfolioValue={totalPortfolioValue} />
          </>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <TransactionsTable username={match.params.username} />
        </TabPanel>
        <TabPanel className={classes.groupsContainer} value={tabValue} index={2}>
          <UserGroupsList username={match.params.username} title={"Groups"} />
        </TabPanel>
      </div>
    </>
  )
}

export default Portfolio

