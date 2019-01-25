import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import UpdateSiteNfo from './update_site_nfo';

const ManageSite = () => {
  return (
    <div className="container">
      <div className="row">
        <Breadcrumb> 
          <BreadcrumbItem>Admin</BreadcrumbItem>
          <BreadcrumbItem active>Site Info</BreadcrumbItem>
        </Breadcrumb>
      </div>
      <UpdateSiteNfo />
    </div>
  );
};

export default ManageSite;