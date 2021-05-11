import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";


import Home from "./components/Home"
import Profile from "./components/Profile"
import Portfolio from "./components/Portfolio"
import GroupHome from "./components/GroupHome"

import TopNav from "./components/TopNav"
import NavDrawer from "./components/NavDrawer"



function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  const styles = {
    maxWidth: 1000,
    margin: '0 auto',
    paddingTop: '100px',
    paddingLeft: isAuthenticated ? '57px' : 0,
  }
  return (
    <Router>
      <TopNav />
      {isAuthenticated && <NavDrawer />}
      <div style={styles}>
        <Route path="/" exact component={Home} />
        <Route path="/profile" exact component={Profile} />
        <Route path="/p/:username?" component={Portfolio} />
        <Route path="/g/:groupId?" component={GroupHome} />
      </div>
    </Router>
  );
}

export default App;
