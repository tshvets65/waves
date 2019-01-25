import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import UserHistoryBlock from '../utils/User/history_block';

const UserHistory = ({ user }) => {
  return (
      <div className="container">
        <div className="row">
          <Breadcrumb> 
            <BreadcrumbItem>My Account</BreadcrumbItem>
            <BreadcrumbItem active>History of purchases</BreadcrumbItem>
          </Breadcrumb>
        </div>
        {
          user.userData.history ?
            <div className="user_nfo_panel">
              <div className="user_product_block_wrapper">
                <UserHistoryBlock products={user.userData.history} />
              </div>
            </div>
            : 
            <p>You have no history of purchases.</p>
        }
        
      </div>

  );
};

export default UserHistory;