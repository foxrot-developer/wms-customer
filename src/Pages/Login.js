import React from 'react';

import LoginForm from '../Components/LoginForm';
import '../Assets/css/Login.css';

const Login = () => {
    return (
        <div className='main-login w-100 d-flex align-items-center justify-content-center'>
            <div className='container bg-white border border-white border-2 rounded shadow p-3 mb-5 bg-body rounded'>
                <div className='row'>
                    <div className='bg col-xs-12 col-md-6 d-flex align-items-center justify-content-center'><h1 className='pt-3 pb-3'>CUSTOMER LOGIN</h1></div>
                    <div className='col-xs-12 col-md-6 p-5'><LoginForm /></div>
                </div>
            </div>
        </div>
    )
}

export default Login;
