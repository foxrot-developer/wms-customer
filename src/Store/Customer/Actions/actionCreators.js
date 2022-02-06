import * as actionTypes from './actionTypes';
import Axios from '../../../Axios/Axios';
import Toast from '../../../Shared/Toast/Toast';

export const customerLogin = (data, navigate) => (dispatch) => {
  Axios.post('user/login', data)
    .then((response) => {
      dispatch({
        type: actionTypes.CUSTOMER_LOGIN,
        payload: response.data.user,
      });
      navigate('/dashboard');
      Toast.success(response.data.message);
    })
    .catch((error) => {
      console.log(error);
      Toast.error(error.response.data.message);
    });
};

export const customerLogout = (navigate) => (dispatch) => {
  dispatch({
    type: actionTypes.CUSTOMER_LOGOUT,
  });
  navigate('/');
};

export const customerOrderList = (userId) => (dispatch) => {
  Axios.get(`user/user-orders/${userId}`)
    .then((response) => {
      dispatch({
        type: actionTypes.CUSTOMER_ORDER_LIST,
        payload: response.data.response,
      });
    })
    .catch((error) => {
      console.log(error);
      Toast.error(error.response.data.message);
    });
};

export const customerExpiredList = (userId) => (dispatch) => {
  Axios.post(`user/user-expired/${userId}`, {
    today_date: formatDateToString(new Date()),
  })
    .then((response) => {
      dispatch({
        type: actionTypes.CUSTOMER_EXPIRED_LIST,
        payload: response.data.response,
      });
    })
    .catch((error) => {
      console.log(error);
      Toast.error(error.response.data.message);
    });
};

function formatDateToString(date) {
  var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();

  var MM = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);

  return `${date.getFullYear()}-${MM}-${dd}`;
}
