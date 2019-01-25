import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../../actions/user';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';

class LoginForm extends Component {

  state = {
    formError: false,
    errMessage: '',
    formSuccess: '',
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email'
        },
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      }
    }
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'login');
    this.setState({
      formError: false,
      errorMessage: '',
      formdata: newFormdata
    })
  }


  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'login');
    let formIsValid = isFormValid(this.state.formdata, 'login')

    if (formIsValid) {
      this.props.dispatch(loginUser(dataToSubmit)).then(response => {
        if (response.payload.loginSuccess) {
          this.props.history.push('/user/dashboard')
        } else {
          this.setState({
            formError: true,
            errorMessage: response.payload.message
          })
        }
      });

    } else {
      this.setState({
        formError: true,
        errorMessage: 'Please check your input'
      })
    }
  }


  render() {
    return (
      <div className="signin_wrapper">
        <form onSubmit={(event) => this.submitForm(event)}>

          <FormField
            id={'email'}
            formdata={this.state.formdata.email}
            change={(element) => this.updateForm(element)}
          />

          <FormField
            id={'password'}
            formdata={this.state.formdata.password}
            change={(element) => this.updateForm(element)}
          />

          {this.state.formError ?
            <div className="error_label">
              {this.state.errorMessage}
            </div>
            : null}
          <button onClick={(event) => this.submitForm(event)}>
            Log in
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(withRouter(LoginForm));