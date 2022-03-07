import { Route, Routes, Navigate } from 'react-router-dom';

import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';
import OrderList from '../Pages/OrderList';
import ExpiredProduct from '../Pages/ExpiredProduct';
import Invoice from '../Pages/Invoice';
import Registration from '../Pages/Registration';

const NavigationRoutes = () => {
  return (
    <Routes>
      <Route exact path='/' element={<Login />} />
      <Route exact path='/registration' element={<Registration />} />
      <Route exact path='/dashboard' element={<Dashboard />} />
      <Route exact path='/orders-list' element={<OrderList />} />
      <Route exact path='/expired-list' element={<ExpiredProduct />} />
      <Route path='inovices' element={<Invoice />} />
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
};

export default NavigationRoutes;
