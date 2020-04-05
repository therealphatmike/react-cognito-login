import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AppliedRoute from './components/AppliedRoute';
import Home from './containers/Home';
import NotFound from './containers/NotFound';
import Login from './containers/Login';

export default function Routes({ appProps }) {
  return (
    <Switch>
      <AppliedRoute path="/" exact component={Home} appProps={appProps} />
      <AppliedRoute path="/login" exact component={Login} appProps={appProps} />

      { /* catch all unmatched routes */ }
      <Route component={NotFound} />
    </Switch>
  );
}