import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

import UpdatePersonalNfo from './update_personal_nfo';

const UpdateProfile = () => {
  return (
    <div className="container">
      <div className="row">
          <Breadcrumb> 
            <BreadcrumbItem>My Account</BreadcrumbItem>
            <BreadcrumbItem><Link to="/user/dashboard">Personal Information</Link></BreadcrumbItem>
            <BreadcrumbItem active>Update</BreadcrumbItem>
          </Breadcrumb>
        </div>
      <UpdatePersonalNfo />
    </div>
  );
};

export default UpdateProfile;