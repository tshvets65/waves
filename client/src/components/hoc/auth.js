import React, { Component } from 'react';
import { connect } from 'react-redux';
import { auth } from '../../actions/user';

export default function (ChildComponent, reload, adminRoute = null) {
  class AuthenticationCheck extends Component {

    componentDidMount() {
      this.props.dispatch(auth()).then(response => {
        let user = this.props.user.userData;

        if (!user.isAuth) {
          if (reload) {
            this.props.history.push('/login')
          }
        } else {
          if (adminRoute && !user.isAdmin) {
            this.props.history.push('/user/dashboard')
          }
        }
      })
    }

    render() {
      return (
        <ChildComponent {...this.props} user={this.props.user} />
      );
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user
    }
  }

  return connect(mapStateToProps)(AuthenticationCheck)
}
