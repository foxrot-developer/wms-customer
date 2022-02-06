import * as actionTypes from './actionTypes';
import Axios from '../../../Axios/Axios';
import Toast from '../../../Shared/Toast/Toast';

export const customerLogin = (data, navigate) => dispatch => {
    Axios.post('user/login', data)
        .then(response => {
            dispatch({
                type: actionTypes.CUSTOMER_LOGIN,
                payload: response.data.user
            });
            navigate('/');
            Toast.success(response.data.message);
        })
        .catch(error => {
            console.log(error);
            Toast.error(error.response.data.message);
        });
};