import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { makeStyles } from '@material-ui/core/styles';


import Home from "./components/Home"
import Profile from "./components/Profile"
import Portfolio from "./components/Portfolio"
import GroupHome from "./components/GroupHome"

import TopNav from "./components/TopNav"
import NavDrawer from "./components/NavDrawer"
import MobileNavDrawer from "./components/MobileNavDrawer"
import useWindowDimensions from "./utils/useWindowDimensions"



function App() {
  const { width } = useWindowDimensions();
  const { user, isAuthenticated, isLoading } = useAuth0();

  const useStyles = makeStyles((theme) => ({
    appWrapper: {
      maxWidth: 1000,
      margin: '0 auto',
      paddingTop: '100px',
      paddingLeft: isAuthenticated ? '57px' : 0,
      [theme.breakpoints.down('xs')]: {
        paddingLeft: 0,
      },
    }
  }))
  const classes = useStyles()

  return (
    <Router>
      <TopNav />
      {isAuthenticated && (width >= 600 ? <NavDrawer /> : <MobileNavDrawer />)}
      <div className={classes.appWrapper}>
        <Route path="/" exact component={Home} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/p/:username?" component={Portfolio} />
        <Route path="/g/:groupId?" component={GroupHome} />
      </div>
    </Router>
  );
}

export default App;
