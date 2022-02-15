import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  AdSidebar,
  SidebarTop,
  SidebarMenu,
  SidebarBottom,
  Avatar,
} from './SidebarStyled';
import {
  Header,
  HeaderContainer,
  ModalContainer,
  ModalContent,
} from '../../Global/GlobalStyle';
import { IconButton, Modal, TextField, Grid } from '@mui/material';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import userImg from '../../../Assets/images/user.jpeg';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';

const SideBar = () => {
  const customer = useSelector((state) => state.customer.customer);
  const { name, email, username } = customer;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal open={isOpen}>
        <ModalContainer>
          <ModalContent>
            <HeaderContainer>
              <Header>الملف الشخصي</Header>
              <IconButton onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </IconButton>
            </HeaderContainer>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label='الجرف'
                  variant='outlined'
                  fullWidth
                  value={name}
                  onChange={() => {}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='البريد الإلكتروني'
                  variant='outlined'
                  fullWidth
                  value={email}
                  onChange={() => {}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label='اسم المستخدم'
                  variant='outlined'
                  fullWidth
                  value={username}
                  onChange={() => {}}
                />
              </Grid>
            </Grid>
          </ModalContent>
        </ModalContainer>
      </Modal>
      <AdSidebar>
        <SidebarTop>
          <div className='logo'>
            <NavLink to='/dashboard' className='text-decoration-none'>
              <h4>متجري</h4>
            </NavLink>
          </div>
        </SidebarTop>
        <SidebarMenu>
          <ul>
            <NavLink to='/dashboard' activeClassName='active'>
              <li>
                <span>
                  <WidgetsOutlinedIcon />
                </span>
                لوحة القيادة
              </li>
            </NavLink>
            <NavLink to='/orders-list' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                ائحة الطلبات
              </li>
            </NavLink>
            <NavLink to='/expired-list' activeClassName='active'>
              <li>
                <span>
                  <ProductionQuantityLimitsIcon />
                </span>
                قائمة المنتجات
              </li>
            </NavLink>
            <NavLink to='/inovices' activeClassName='active'>
              <li>
                <span>
                  <ProductionQuantityLimitsIcon />
                </span>
                دفع
              </li>
            </NavLink>
          </ul>
        </SidebarMenu>
        <SidebarBottom>
          <Avatar>
            <div
              onClick={() => {
                setIsOpen(!isOpen);
              }}
              style={{
                color: '#fff',
              }}
            >
              <img
                src={userImg}
                alt='Avatar'
                style={{
                  width: 50,
                  height: 50,
                }}
              />
              <span>{customer.username}</span>
            </div>
          </Avatar>
        </SidebarBottom>
      </AdSidebar>
    </>
  );
};
export default SideBar;
