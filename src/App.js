import './App.css';
import Blog from './lib/blog/posts/home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Navbar from './lib/dashboard/navbar';
import AddPost from './lib/admin/add_post';

function App() {

  return(
    <Router>
      <Switch>
        <Route exact path="/">
          <Navbar></Navbar>
        </Route>
        <Route exact path="/admin">
          <AddPost></AddPost>
        </Route>
      </Switch>
    </Router>
  );
  
}

export default App;
