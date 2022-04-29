import "./styles/App.css";

import ReactGA from "react-ga";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { config } from "./blog.config";
import Admin from "./lib/admin";
import Blog from "./lib/blog/posts/home";
import PostList from "./lib/blog/posts/post_list";
import { BlogComponent } from "./lib/components";
import Navbar from "./lib/dashboard/navbar";
import { pageViews } from "./lib/seo/react-ga";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    ReactGA.initialize("UA-227468019-1");
  }, []);

  return (
    <Router>
      <Navbar>
        <Switch>
          <Route
            exact
            path="/"
            render={() => {
              pageViews("home");
              return <Blog />;
            }}
          />
          <Route exact path="/admin" render={() => <Admin />} />
          {config.blog_categories.map((cat) => {
            return (
              <Route
                exact
                path={`/${cat.path}`}
                render={() => {
                  pageViews(cat.path);
                  return <PostList cat={cat.path} />;
                }}
              />
            );
          })}
          <Route
            path="/posts/:id"
            render={() => {
              pageViews("post");
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
