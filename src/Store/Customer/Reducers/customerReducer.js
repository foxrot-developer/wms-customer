import * as actionTypes from '../Actions/actionTypes';

const initialState = {
    customer: {},
    isLoggedin: false
}

const CustomerReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CUSTOMER_LOGIN:
            return {
                ...state,
                customer: action.payload,
                isLoggedin: true
            }
        default:
            return state;
    }
}

export default CustomerReducer;
