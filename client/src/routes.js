import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Auth from './components/hoc/auth';
import Layout from './components/hoc/layout';
import Home from './components/Home';
import Login from './components/Register_login';
import Register from './components/Register_login/register';
import UserDashboard from './components/User';
import AddProduct from './components/User/Admin/add_product';
import ManageCategories from './components/User/Admin/manage_categories';
import Shop from './components/Shop';
import ProductPage from './components/Product';
import UserCart from './components/User/cart';

const Routes = () => {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact component={Auth(Home, null)} />
        <Route path="/shop" exact component={Auth(Shop,null)}/>
        <Route path="/login" exact component={Auth(Login, false)} />
        <Route path="/register" exact component={Auth(Register, false)} />
        <Route path="/user/dashboard" exact component={Auth(UserDashboard, true)} />
        <Route path="/user/cart" exact component={Auth(UserCart,true)}/>

        <Route path="/admin/add_product" exact component={Auth(AddProduct,true)}/>
        <Route path="/admin/manage_categories" exact component={Auth(ManageCategories,true)}/>
        <Route path="/product_detail/:id" exact component={Auth(ProductPage,null)}/>
      </Switch>
    </Layout>
  );
};

export default Routes;