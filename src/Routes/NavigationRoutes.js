import { Route, Routes, Navigate } from 'react-router-dom';

import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import OrderList from '../Pages/OrderList';
import ExpiredProduct from '../Pages/ExpiredProduct';

const NavigationRoutes = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route exact path='/dashboard' element={<Dashboard />} />
      <Route exact path='/orders-list' element={<OrderList />} />
      <Route exact path='/expired-list' element={<ExpiredProduct />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default NavigationRoutes;
