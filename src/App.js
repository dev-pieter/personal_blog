import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Navbar from './lib/dashboard/navbar';
import PostList from './lib/blog/posts/daily_dev';
import Blog from './lib/blog/posts/home';
import Admin from './lib/admin';

function App() {

  return(
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/personal_blog/">
          <Blog></Blog>
        </Route>
        <Route exact path="/personal_blog/admin">
          <Admin></Admin>
        </Route>
        <Route exact path="/personal_blog/daily">
          <PostList cat='daily'></PostList>
        </Route>
        <Route exact path="/personal_blog/tutorials">
          <PostList cat='tutorial'></PostList>
        </Route>
        <Route>
          <Redirect to='/personal_blog/'></Redirect>
        </Route>
      </Switch>
    </Router>
  );
  
}

export default App;
