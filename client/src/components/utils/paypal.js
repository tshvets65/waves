import React, { Component } from 'react';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
  render() {

    const onSuccess = (payment) => {
      this.props.onSuccess(payment);
    }

    const onCancel = (data) => {
      console.log(JSON.stringify(data))
    }

    const onError = (err) => {
      console.log(JSON.stringify(err))
    }

    let total = this.props.toPay;

    const env = process.env.NODE_ENV === 'production' ? 'production' : 'sandbox';

    const client = {
      sandbox: process.env.REACT_APP_PAYPAL_CLIENT_ID_SANDBOX,
      production: process.env.REACT_APP_PAYPAL_CLIENT_ID_PRODUCTION,
    };

    return (
      <div>
        <PaypalExpressBtn
          env={env}
          client={client}
          currency='USD'
          total={total}
          onError={onError}
          onSuccess={onSuccess}
          onCancel={onCancel}
          style={{
            size: 'large',
            color: 'blue',
            shape: 'rect',
            label: 'checkout'
          }}
        />
      </div>
    );
  }
}

export default Paypal;