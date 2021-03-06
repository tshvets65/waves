import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from './components/hoc/auth';
import Layout from './components/hoc/layout';

import Home from './components/Home';
import RegisterLogin from './components/Register_login';
import Register from './components/Register_login/register';
import Confirm from './components/Register_login/confirm';
import Shop from './components/Shop';
import ProductPage from './components/Product';
import ResetUser from './components/Reset_user';
import ResetPass from './components/Reset_user/reset_pass';

import UserDashboard from './components/User';
import UserHistory from './components/User/history';
import AddProduct from './components/User/Admin/add_product';
import ManageCategories from './components/User/Admin/manage_categories';
import UserCart from './components/User/cart';
import UpdateProfile from './components/User/update_profile';
import ManageSite from './components/User/Admin/manage_site';

import PageNotFound from './components/utils/page_not_found';

const Routes = () => {
  return (
    <Layout>
      <Switch>
      <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />
      <Route path="/user/history" exact component={Auth(UserHistory, true)} />
        <Route path="/user/cart" exact component={Auth(UserCart, true)} />
        <Route path="/user/user_profile" exact component={Auth(UpdateProfile, true)} />
        <Route path="/admin/add_product" exact component={Auth(AddProduct, true)} />
        <Route path="/admin/manage_categories" exact component={Auth(ManageCategories, true)} />
        <Route path="/admin/site_info" exact component={Auth(ManageSite, true)} />

        <Route path="/product_detail/:id" exact component={Auth(ProductPage, null)} />
        <Route path="/reset_user" exact component={Auth(ResetUser, false)} />
        <Route path="/reset_password/:token" exact component={Auth(ResetPass,false)}/>
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/confirm/:id" exact component={Auth(Confirm, false)} />
        <Route path="/login" exact component={Auth(RegisterLogin, false)} />
        <Route path="/shop" exact component={Auth(Shop, null)} />
        <Route path="/" exact component={Auth(Home, null)} />
        <Route component={Auth(PageNotFound)} />
      </Switch>
    </Layout>
  );
};

export default Routes;