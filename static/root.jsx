import React from 'react';
import ReactDOM from 'react-dom';
const Router = ReactRouterDOM.BrowserRouter;
const Route =  ReactRouterDOM.Route;
const Link =  ReactRouterDOM.Link;
const Prompt =  ReactRouterDOM.Prompt;
const Switch = ReactRouterDOM.Switch;
const Redirect = ReactRouterDOM.Redirect;
const useParams = ReactRouterDOM.useParams;
const useHistory = ReactRouterDOM.useHistory;
// same as the above but using destructing syntax 
// const { useHistory, useParams, Redirect, Switch, Prompt, Link, Route } = ReactRouterDOM;

function Homepage() {
  return <div> Welcome to my site </div>
}

function App() {
    return (
      <Router>
        {/* <nav>
          <ul>
            <li>
                <Link to="/"> Home </Link>
                */<h1>Hello World!!</h1>/*
            </li>
            <li>
                <Link to="/about"> About </Link>
            </li>
            <li>
                <Link to="/search"> Search </Link>
            </li>
            <li>
                <Link to="/login"> Login </Link>
            </li>
          </ul>
        </nav>
        <div>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/login">
              <LogIn />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="/">
              <Homepage />
            </Route>
          </Switch>
        </div> */}
      </Router>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))

templates/root.html