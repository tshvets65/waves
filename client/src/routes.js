import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from './components/hoc/auth';
import Layout from './components/hoc/layout';
import Home from './components/Home';
import Login from './components/Register_login';
import Register from './components/Register_login/register';
import UserDashboard from './components/User';
import Shop from './components/Shop';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/shop" exact component={Auth(Shop,null)}/>
        <Route path="/login" exact component={Auth(Login, false)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />
      </Switch>
    </Layout>
  );
};

export default Routes;