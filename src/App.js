import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home"
import Profile from "./components/Profile"
import Portfolio from "./components/Portfolio"
import GroupHome from "./components/GroupHome"

import TopNav from "./components/TopNav"

function App() {
  const styles = {
    paddingTop: '100px',
  }
  return (
    <Router>
      <TopNav>
        <div style={styles}>
          <Route path="/" exact component={Home} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/p/:username?" component={Portfolio} />
          <Route path="/g/:groupId?" component={GroupHome} />
        </div>
      </TopNav>
    </Router>
  );
}

export default App;
