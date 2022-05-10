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
import Blog from "./lib/blog/content/home";
import PostList from "./lib/blog/content/postList";
import Post from "./lib/blog/content/post";
import Navbar from "./lib/blog/navigation/Navbar";
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
                key={cat}
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
              return <Post />;
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
