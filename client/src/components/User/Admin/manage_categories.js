import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import ManageBrands from './manage_brands';
import ManageWoods from './manage_woods';

const ManageCategories = () => {
  return (

      <div className="container">
      <div className="row">
        <Breadcrumb> 
          <BreadcrumbItem>Admin</BreadcrumbItem>
          <BreadcrumbItem active>Manage Categories</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <ManageBrands />
      <ManageWoods />
    </div>
  );
};

export default ManageCategories;