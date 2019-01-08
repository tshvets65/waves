import axios from 'axios';
import * as ActionTypes from './types';
import { USER_SERVER } from '../components/utils/misc';

export function registerUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/register`, dataToSubmit)
    .then(response => response.data);

  return {
    type: ActionTypes.REGISTER_USER,
    payload: request
  }
}

export function loginUser(dataToSubmit) {
  const request = axios.post(`${USER_SERVER}/login`, dataToSubmit)
    .then(response => response.data);

  return {
    type: ActionTypes.LOGIN_USER,
    payload: request
  }
}

export function auth() {

  const request = axios.get(`${USER_SERVER}/auth`)
    .then(response => response.data);

  return {
    type: ActionTypes.AUTH_USER,
    payload: request
  }

}

export function logoutUser() {

  const request = axios.get(`${USER_SERVER}/logout`)
    .then(response => response.data);

  return {
    type: ActionTypes.LOGOUT_USER,
    payload: request
  }

}