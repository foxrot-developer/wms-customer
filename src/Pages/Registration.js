import React from 'react';

import RegistrationForm from '../Components/RegistrationForm';
import '../Assets/css/Login.css';

const Registration = () => {
  return (
    <div className='main-login w-100 d-flex align-items-center justify-content-center'>
      <div className='container bg-white border border-white border-2 rounded shadow p-3 mb-5 bg-body rounded'>
        <div className='row'>
          <div
            className='bg col-xs-12 col-md-6 d-flex align-items-center justify-content-center'
            style={{
              background: '#3751ff',
            }}
          >
            <h1 className='pt-3 pb-3'>تسجيل دخول العميل</h1>
          </div>
          <div className='col-xs-12 col-md-6 p-5'>
            <RegistrationForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Registration;
