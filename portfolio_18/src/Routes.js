import React from 'react';
import { Route, Switch } from 'react-router-dom';

// JS files
import AppliedRoute from './SupportFiles/AppliedRoute';
import Home from './Home/Home';
import Digital from './Work/Digital/Digital';
import Illustration from './Work/Illustration/Illustration';
import DigitalContentPage from './Work/DigitalContentPage/DigitalContentPage';

export default () =>
  <Switch>
    <AppliedRoute path="/" exact component={Home} />
    <AppliedRoute path="/work/digital" exact component={Digital} />
    <AppliedRoute path="/work/illustration" exact component={Illustration} />
    <AppliedRoute path="/work/digital/:id" exact component={DigitalContentPage} />

    { /* Catch all unmatched routes */ }
    {/* <Route component={NotFound} /> */}
  </Switch>;
