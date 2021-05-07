import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home"
import Profile from "./components/Profile"
import Portfolio from "./components/Portfolio"
import GroupHome from "./components/GroupHome"

import TopNav from "./components/TopNav"

function App() {
  const styles = {
    maxWidth: 1000,
    margin: '0 auto',
    paddingTop: '100px',
  }
  return (
    <Router>
      <TopNav />
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
