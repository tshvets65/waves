import React, { Component } from 'react';
import axios from 'axios';
import CircularProgress from '@material-ui/core/CircularProgress';
import { USER_SERVER } from '../utils/misc';

export default class Confirm extends Component {

  state = {
    confirming: true
  }

  componentDidMount = () => {
    const { id } = this.props.match.params;

    axios.get(`${USER_SERVER}/confirm/${id}`)
      .then(response => {
        if (response.data.confirmed) {
          this.setState({ success: true, confirming: false });
          this.props.history.push('/login');
        } else {
          this.setState({
            success: false,
            message: response.data.message,
            confirming: false
          });
        }
      })
  }

  render = () =>
    <div className='container'>
      {this.state.confirming ?
        <CircularProgress
          style={{ color: '#00bcd4' }}
          thickness={7}
        />
        : <div>{this.state.message}</div>
      }
    </div>
}