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
import { useEffect, useState } from "react";
import { ColorContext } from "./providers/ContextProvider";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const dm = localStorage.getItem("dark-mode");
    setDarkMode(dm === "true" ? true : false);

    ReactGA.initialize("UA-227468019-1");
  }, []);

  return (
    <ColorContext.Provider value={darkMode}>
      <Router>
        <Navbar setDarkMode={setDarkMode}>
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
    </ColorContext.Provider>
  );
}

export default App;
