import * as actionTypes from '../Actions/actionTypes';

const initialState = {
  customer: {},
  isLoggedin: false,
  orderList: [],
  expiredList: [],
};

const CustomerReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CUSTOMER_LOGIN:
      return {
        ...state,
        customer: action.payload,
        isLoggedin: true,
      };
    case actionTypes.CUSTOMER_LOGOUT:
      return {
        ...state,
        customer: {},
        isLoggedin: false,
      };
    case actionTypes.CUSTOMER_ORDER_LIST:
      return {
        ...state,
        orderList: action.payload,
      };
    case actionTypes.CUSTOMER_EXPIRED_LIST:
      return {
        ...state,
        expiredList: action.payload,
      };

    default:
      return state;
  }
};

export default CustomerReducer;
