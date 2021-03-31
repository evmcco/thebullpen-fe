import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home"
import Profile from "./components/Profile"
import Portfolio from "./components/Portfolio"
import GroupHome from "./components/GroupHome"

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/profile" exact component={Profile} />
      <Route path="/p/:username?" component={Portfolio} />
      <Route path="/g/:groupId?" component={GroupHome} />
    </Router>
  );
}

export default App;
