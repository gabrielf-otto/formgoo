import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import SignIn from '../pages/SignIn';
// import SignUp from '../pages/SignUp';

import FormList from '../pages/FormList';
import Form from '../pages/Form';

import ResolutionList from '../pages/ResolutionList';
import ResolutionView from '../pages/ResolutionView';

import FormView from '../pages/FormView';


const Routes: React.FC = () => (
   <Switch>
      <Route path="/signin" component={SignIn} />
      {/* <Route path="/signup" component={SignUp} /> */}

      <Route path="/" exact component={FormList} isPrivate />
      <Route path="/forms/:id/view" component={FormView} />
      <Route path="/forms/:id?" exact component={Form} isPrivate />

      <Route path="/forms/:id/resolutions" exact component={ResolutionList} isPrivate />
      <Route path="/resolutions/:id/view" exact component={ResolutionView} isPrivate />
   </Switch>
);


export default Routes;
