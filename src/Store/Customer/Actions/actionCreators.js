import * as actionTypes from "./actionTypes";
import Axios from "../../../Axios/Axios";
import Toast from "../../../Shared/Toast/Toast";

export const customerLogin = (data, navigate) => (dispatch) => {
  Axios.post("user/login", data)
    .then((response) => {
      dispatch({
        type: actionTypes.CUSTOMER_LOGIN,
        payload: response.data.user,
      });
      navigate("/dashboard");
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
  navigate("/");
};

export const customerOrderList = (userId) => (dispatch) => {
  Axios.get(`user/user-orders/${userId}`)
    .then((response) => {
      var data = [...response.data.shelf_orders, ...response.data.others];
      dispatch({
        type: actionTypes.CUSTOMER_ORDER_LIST,
        payload: data,
      });
    })
    .catch((error) => {
      console.log(error);
      Toast.error(error.response.data.message);
    });
};

export const transferProductWarehouse =
  (data, id, setTransferModal) => (dispatch) => {
    Axios.post("warehouse/request", data)
      .then((response) => {
        Toast.success(response.data.message);
        dispatch(customerOrderList(id));
        setTransferModal(false);
      })
      .catch((error) => {
        console.log(error);
        Toast.error(error.response.data.message);
      });
  };

export const transferWithDraw =
  (data, id, setTransferModal, setOpenTearmentModal) => (dispatch) => {
    Axios.post("product/withdraw-request", data)
      .then((response) => {
        Toast.success(response.data.message);
        dispatch(customerOrderList(id));
        setTransferModal(false);
        setOpenTearmentModal(false);
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

export const getAllWarehouse = () => (dispatch) => {
  Axios.get("warehouse/all-warehouses")
    .then((res) => {
      dispatch({
        type: actionTypes.GET_ALL_WAREHOUSE,
        payload: res.data.warehouses,
      });
    })
    .catch((err) => {
      Toast.error(err.response.data.message);
    });
};
function formatDateToString(date) {
  var dd = (date.getDate() < 10 ? "0" : "") + date.getDate();

  var MM = (date.getMonth() + 1 < 10 ? "0" : "") + (date.getMonth() + 1);

  return `${date.getFullYear()}-${MM}-${dd}`;
}

export const getCustomerInvoice = (id) => (dispatch) => {
  Axios.post("product/calculate-price", {
    customer_id: id,
  })
    .then((response) => {
      dispatch({
        type: actionTypes.GET_CUSTOMER_INVOICE,
        payload: response.data,
      });
    })
    .catch((error) => {
      console.log(error.response.data.message);
      Toast.error(error.response.data.message);
    });
};
