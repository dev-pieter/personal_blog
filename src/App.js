import './App.css';
import Dashboard from './lib/dashboard';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './lib/dashboard/navbar';

function App() {

  return(
    <Router>
      <Switch>
        <Route exact path="/">
          <Dashboard></Dashboard>
        </Route>
        <Route exact path="/blog">
          <Navbar></Navbar>
          <p>Blog</p>
        </Route>
      </Switch>
    </Router>
  );
  
}

export default App;
