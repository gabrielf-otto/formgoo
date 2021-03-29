import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
// import SignUp from '../pages/SignUp';

import Dashboard from '../pages/Dashboard';
import Form from '../pages/Form';
import Resolution from '../pages/Resolution';


const Routes: React.FC = () => (
   <Switch>
      <Route path="/signin" component={SignIn} />
      {/* <Route path="/signup" component={SignUp} /> */}

      <Route path="/" exact component={Dashboard} isPrivate />
      <Route path="/forms/:id?" component={Form} isPrivate />
      <Route path="/forms/:id/resolutions" component={Resolution} isPrivate />
   </Switch>
);


export default Routes;
