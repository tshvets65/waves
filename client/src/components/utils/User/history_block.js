import React from 'react';
import moment from 'moment';
import { Table } from 'reactstrap';

const UserHistoryBlock = (props) => {
  
  const renderBlocks = () => (
    props.products ?
      props.products.map((product,i) => (
        <tr key={i}>
          <td>{moment(product.dateOfPurchase).format('MM-DD-YYYY')}</td>
          <td>{product.brand} {product.name}</td>
          <td>${product.price}</td>
          <td>{product.quantity}</td>
        </tr>
      ))
    : null
  );

  return (
    <div className='history_blocks'>
      <Table striped>
        <thead>
          <tr>
            <th>Date of purchase</th>
            <th>Product</th>
            <th>Price paid</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {renderBlocks()}
        </tbody>
      </Table>
    </div>
  );
};

export default UserHistoryBlock;