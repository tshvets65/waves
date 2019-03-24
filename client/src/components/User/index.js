import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import MyButton from '../utils/button';

const UserDashboard = ({ user }) => {
  return (
      <div className="container">
        <div className="row">
          <Breadcrumb> 
            <BreadcrumbItem>My Account</BreadcrumbItem>
            <BreadcrumbItem active>Personal Information</BreadcrumbItem>
          </Breadcrumb>
        </div>
        <div className="user_nfo_panel">
          <div>
            <span>{user.userData.name}</span>
            <span>{user.userData.lastname}</span>
            <span>{user.userData.email}</span>
          </div>
          <MyButton
            type="default"
            title="Edit account info"
            linkTo="/user/user_profile"
          />
        </div>
      </div>

  );
};

export default UserDashboard;