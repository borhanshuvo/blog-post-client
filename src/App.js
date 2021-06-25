import React, { createContext, useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Home from './components/Home/Home/Home';
import Login from './components/Login/Login/Login';
import NotFound from './components/NotFound/NotFound';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import SingleBlogPost from './components/Home/SingleBlogPost/SingleBlogPost';
import PrivateRoute from "./components/Login/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
        <Switch>

          <Route exact path='/'>
            <Home />
          </Route>

          <Route path="/singleBlogPost/:id">
            <SingleBlogPost />
          </Route>

          <PrivateRoute path='/dashboard'>
            <Dashboard />
          </PrivateRoute>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="*">
            <NotFound />
          </Route>

        </Switch>
      </Router>
    </UserContext.Provider>
  );
}

export default App;
