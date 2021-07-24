import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './lib/dashboard/navbar';
import AddPost from './lib/admin/add_post';
import PostList from './lib/blog/posts/daily_dev';
import Blog from './lib/blog/posts/home';

function App() {

  return(
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/personal_blog/">
          <Blog></Blog>
        </Route>
        <Route exact path="/personal_blog/admin">
          <AddPost></AddPost>
        </Route>
        <Route exact path="/personal_blog/daily">
          <PostList cat='daily'></PostList>
        </Route>
        <Route exact path="/personal_blog/tutorials">
          <PostList cat='tutorial'></PostList>
        </Route>
      </Switch>
    </Router>
  );
  
}

export default App;
