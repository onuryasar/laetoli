import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Footer from './shared/components/Footer/Footer';

import Footprints from './footprints/pages/Footprints';
import Search from './sand/pages/Search';
import TvShow from './sand/pages/TvShow';
import Movie from './sand/pages/Movie';
import About from './shared/pages/About';
import Auth from './user/pages/Auth';

function App() {
  const { token, login, logout, userId, name } = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Footprints />
        </Route>
        <Route path="/me" exact>
          <p />
        </Route>
        <Route path="/search/:query?" exact>
          <Search />
        </Route>
        <Route path="/tv-show/:id" exact>
          <TvShow />
        </Route>
        <Route path="/movie/:id" exact>
          <Movie />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Footprints />
        </Route>
        <Route path="/search/:query?" exact>
          <Search />
        </Route>
        <Route path="/tv-show/:id" exact>
          <TvShow />
        </Route>
        <Route path="/movie/:id" exact>
          <Movie />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Route path="/auth" exact>
          <Auth />
        </Route>
        <Redirect to="/auth" />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: !!token, token, userId, name, login, logout }}
    >
      <Router>
        <MainNavigation />
        <main>{routes}</main>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
