import { BrowserRouter as Router, Route } from "react-router-dom";

import Main from "./components/Main"
import Profile from "./components/Profile"

function App() {
  return (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/profile" exact component={Profile} />
    </Router>
  );
}

export default App;
