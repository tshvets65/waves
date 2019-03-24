import React, { Component } from 'react';
import axios from 'axios';
import FormField from '../utils/Form/formfield';
import { update, generateData, isFormValid } from '../utils/Form/formActions';

class ResetUser extends Component {

  state = {
    formError: false,
    formSuccess: false,
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

    }
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'reset_user');
    this.setState({
      formError: false,
      formdata: newFormdata
    })
  }

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'register');
    let formIsValid = isFormValid(this.state.formdata, 'register')

    if (formIsValid) {
      axios.post('/api/users/reset_user', dataToSubmit)
        .then(response => {
          if(response.data.success) {
            this.setState({formSuccess: true})
          }
        })
    } else {
      this.setState({
        formError: true
      })
    }
  }

  render() {
    return (
      <div className='container'>
        <h1>Reset password</h1>
        <form onSubmit={(event) => this.submitForm(event)}>
          <div>
            <FormField
              id={'email'}
              formdata={this.state.formdata.email}
              change={(element) => this.updateForm(element)}
            />
          </div>
          <div>
            {this.state.formSuccess ?
              <div className="form_success">
                Please check your email
              </div>
              : null
            }
            {this.state.formError ?
              <div className="error_label">
                Please check your data
              </div>
              : null
            }
            <button onClick={(event) => this.submitForm(event)}>
              Send email to reset password
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default ResetUser;