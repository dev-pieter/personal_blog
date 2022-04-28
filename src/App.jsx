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
import { pageViews } from "./lib/seo/react-ga";

function App() {
  return (
    <Router>
      <Navbar>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              pageViews();
              return <Blog />;
            }}
          />
          <Route
            exact
            path="/admin"
            render={() => {
              pageViews();
              return <Admin />;
            }}
          />
          {config.blog_categories.map((cat) => {
            return (
              <Route
                exact
                path={`/${cat.path}`}
                render={() => {
                  pageViews();
                  return <PostList cat={cat.path} />;
                }}
              />
            );
          })}
          <Route
            path="/posts/:id"
            render={() => {
              pageViews();
              return <BlogComponent />;
            }}
          />
          <Route>
            <Redirect to="/admin"></Redirect>
          </Route>
        </Switch>
      </Navbar>
    </Router>
  );
}

export default App;
