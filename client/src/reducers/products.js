import * as ActionTypes from '../actions/types';

export default function (state = {}, action) {
  switch (action.type) {
    case ActionTypes.GET_PRODUCTS_BY_SELL:
      return { ...state, bySell: action.payload }
    case ActionTypes.GET_PRODUCTS_BY_ARRIVAL:
      return { ...state, byArrival: action.payload }
    case ActionTypes.GET_BRANDS:
      return { ...state, brands: action.payload }
    case ActionTypes.ADD_BRAND:
      return {
        ...state,
        addBrand: action.payload.success,
        brands: action.payload.brands
      }
    case ActionTypes.GET_WOODS:
      return { ...state, woods: action.payload }
    case ActionTypes.ADD_WOOD:
      return {
        ...state,
        addWood: action.payload.success,
        woods: action.payload.woods
      }
    case ActionTypes.GET_PRODUCTS_TO_SHOP:
      return {
        ...state,
        toShop: action.payload.articles,
        toShopSize: action.payload.size
      }
    case ActionTypes.ADD_PRODUCT:
      return { ...state, addProduct: action.payload }
    case ActionTypes.CLEAR_PRODUCT:
      return { ...state, addProduct: action.payload }
    case ActionTypes.GET_PRODUCT_DETAIL:
      return { ...state, prodDetail: action.payload }
    case ActionTypes.CLEAR_PRODUCT_DETAIL:
      return { ...state, prodDetail: action.payload }
    default:
      return state;
  }
}