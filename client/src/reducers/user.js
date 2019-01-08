import * as ActionTypes from '../actions/types';

export default function(state={}, action) {
  switch(action.type){
    case ActionTypes.REGISTER_USER:
      return {...state, register: action.payload }
    case ActionTypes.LOGIN_USER:
      return { ...state, loginSucces: action.payload }
    case ActionTypes.AUTH_USER:
      return {...state, userData: action.payload }
    case ActionTypes.LOGOUT_USER:
      return {...state }
    default:
      return state;
  }
}