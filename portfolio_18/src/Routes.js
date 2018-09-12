import React from 'react';
import { Route, Switch } from 'react-router-dom';

// JS files
import AppliedRoute from './SupportFiles/AppliedRoute';
import Home from './Home/Home';

export default () =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} />

    { /* Catch all unmatched routes */ }
    {/* <Route component={NotFound} /> */}
  </Switch>;
