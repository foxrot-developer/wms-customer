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
import {
  IconButton,
  Modal,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import userImg from '../../../Assets/images/user.jpeg';
import { useSelector } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const SideBar = () => {
  const { t } = useTranslation();
  const customer = useSelector((state) => state.customer.customer);
  const { name, email, username } = customer;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Modal open={isOpen}>
        <ModalContainer>
          <ModalContent>
            <HeaderContainer>
              <Header>{t('Profile')}</Header>
              <IconButton onClick={() => setIsOpen(false)}>
                <CloseIcon />
              </IconButton>
            </HeaderContainer>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label={t('name')}
                  variant='outlined'
                  fullWidth
                  value={name}
                  onChange={() => {}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t('email')}
                  variant='outlined'
                  fullWidth
                  value={email}
                  onChange={() => {}}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label={t('username')}
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
          <FormControl fullWidth className='form-control'>
            <InputLabel htmlFor='language'>{t('Language')}</InputLabel>
            <Select
              id='language'
              onChange={(e) => {
                i18next.changeLanguage(e.target.value);
              }}
            >
              <MenuItem value='en'>English</MenuItem>
              <MenuItem value='ar'>Arabic</MenuItem>
            </Select>
          </FormControl>
        </SidebarTop>
        <SidebarMenu>
          <ul>
            <NavLink to='/dashboard' activeClassName='active'>
              <li>
                <span>
                  <WidgetsOutlinedIcon />
                </span>
                <span>{t('dashboard')}</span>
              </li>
            </NavLink>
            <NavLink to='/orders-list' activeClassName='active'>
              <li>
                <span>
                  <ShoppingBagOutlinedIcon />
                </span>
                <span>{t('orderList')}</span>
              </li>
            </NavLink>
            <NavLink to='/expired-list' activeClassName='active'>
              <li>
                <span>
                  <ProductionQuantityLimitsIcon />
                </span>
                <span>{t('ProductsExpiry')}</span>
              </li>
            </NavLink>
            <NavLink to='/inovices' activeClassName='active'>
              <li>
                <span>
                  <ProductionQuantityLimitsIcon />
                </span>
                <span>{t('invoice')}</span>
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
