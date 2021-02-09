import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/Home"
import Profile from "./components/Profile"

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/profile" exact component={Profile} />
    </Router>
  );
}

export default App;
