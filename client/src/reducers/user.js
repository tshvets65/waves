import * as ActionTypes from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case ActionTypes.REGISTER_USER:
      return { ...state, register: action.payload }
    case ActionTypes.LOGIN_USER:
      return { ...state, loginSucces: action.payload }
    case ActionTypes.AUTH_USER:
      return { ...state, userData: action.payload }
    case ActionTypes.UPDATE_DATA_USER:
      return { ...state, updateUser: action.payload }
    case ActionTypes.LOGOUT_USER:
      return { ...state }
    case ActionTypes.ADD_TO_CART_USER:
      return {
        ...state, userData: {
          ...state.userData,
          cart: action.payload
        }
      }
    case ActionTypes.GET_CART_ITEMS_USER:
      return { ...state, cartDetail: action.payload }
    case ActionTypes.REMOVE_CART_ITEM_USER:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        userData: {
          ...state.userData,
          cart: action.payload.cart
        }
      }
    case ActionTypes.ON_SUCCESS_BUY_USER:
      return {
        ...state,
        successBuy: action.payload.success,
        userData: {
          ...state.userData,
          cart: action.payload.cart
        },
        cartDetail: action.payload.cartDetail
      }
    default:
      return state;
  }
}