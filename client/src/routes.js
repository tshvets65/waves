import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Layout from './components/hoc/layout';
import Home from './components/Home';
import Login from './components/Register_login';
import Register from './components/Register_login/register';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/register" exact component={Register} />
      </Switch>
    </Layout>
  );
};

export default Routes;