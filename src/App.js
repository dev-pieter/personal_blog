import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Navbar from './lib/dashboard/navbar';
import PostList from './lib/blog/posts/post_list';
import Blog from './lib/blog/posts/home';
import Admin from './lib/admin';
import BlogComponent from './lib/blog/components/BlogComponent';

function App() {

  return(
    <Router>
      <Navbar></Navbar>
      <Switch>
        <Route exact path="/">
          <Blog></Blog>
        </Route>
        <Route exact path="/admin">
          <Admin></Admin>
        </Route>
        <Route exact path="/daily">
          <PostList cat='daily'></PostList>
        </Route>
        <Route exact path="/tutorials">
          <PostList cat='tutorial'></PostList>
        </Route>
        <Route path="/posts/:id">
          <BlogComponent></BlogComponent>
        </Route>
        <Route>
          <Redirect to='/admin'></Redirect>
        </Route>
      </Switch>
    </Router>
  );
  
}

export default App;
