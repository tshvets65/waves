import React from 'react';
import MyButton from '../utils/button';
import LoginForm from './login';

const Login = () => {
  return (
    <div className="page_wrapper">
      <div className="container">
        <div className="register_login_container">
          <div className="left">
            <h2>New Customers</h2>
            <MyButton
              type="default"
              title="Create an account"
              linkTo="/register"
              addStyles={{
                margin: '10px 0 0 0'
              }}
            />
          </div>
          <div className="right">
            <h2>Registered customers</h2>
            <p>If you have an account please log in.</p>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;