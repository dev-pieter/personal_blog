import "./styles/App.css";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Admin from "./lib/admin";
import Blog from "./lib/blog/posts/home";
import PostList from "./lib/blog/posts/post_list";
import { BlogComponent } from "./lib/components";
import Navbar from "./lib/dashboard/navbar";
import { config } from "./blog.config";

function App() {
  return (
    <Router>
      <Navbar>
        <Switch>
          <Route exact path="/">
            <Blog></Blog>
          </Route>
          <Route exact path="/admin">
            <Admin></Admin>
          </Route>
          {config.blog_categories.map((cat) => {
            return (
              <Route exact path={`/${cat.path}`}>
                <PostList cat={cat.path}></PostList>
              </Route>
            );
          })}
          <Route path="/posts/:id">
            <BlogComponent></BlogComponent>
          </Route>
          <Route>
            <Redirect to="/admin"></Redirect>
          </Route>
        </Switch>
      </Navbar>
    </Router>
  );
}

export default App;
