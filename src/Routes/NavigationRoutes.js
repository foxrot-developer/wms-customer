import { Route, Routes, Navigate } from 'react-router-dom';

import Login from '../Pages/Login';
import Dashboard from '../Pages/Dashboard';

const NavigationRoutes = () => {
    return (
        <Routes>
            <Route exact path='/' element={<Dashboard />}></Route>
            <Route exact path='/login' element={<Login />}></Route>
            <Route
                path="*"
                element={<Navigate to="/" />}
            />
        </Routes>
    )
}

export default NavigationRoutes
