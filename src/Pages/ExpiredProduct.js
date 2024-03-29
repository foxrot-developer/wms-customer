import {
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import SideBar from '../Components/Dashboard/Sidebar/SideBar';
import {
  Container,
  ContentWrap,
  Header,
  InnerConatiner,
} from '../Components/Global/GlobalStyle';
import { customerExpiredList } from '../Store/Customer/Actions/actionCreators';

const ExpiredProduct = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const expiredList = useSelector((state) => state.customer.expiredList);
  console.log(expiredList);
  const customer = useSelector((state) => state.customer.customer);
  console.log(customer);
  useEffect(() => {
    if (customer.id) {
      dispatch(customerExpiredList(customer.id));
    }
  }, [customer]);
  return (
    <Container>
      <ContentWrap>
        <SideBar />
        <InnerConatiner>
          <div className='container p-md-5 '>
            <div className='row'>
              <div className='col-12'>
                <Header>{t('ProductsExpiry')}</Header>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 450 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell width={50}>#</TableCell>
                        <TableCell width={50}>{t('productName')}</TableCell>
                        <TableCell width={50}>{t('createdAt')}</TableCell>
                        <TableCell width={50}>{t('ExpiryDate')}</TableCell>
                        <TableCell width={50}>{t('remainingDays')}</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {expiredList !== undefined &&
                        expiredList.map((shelf, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              '&:last-child td, &:last-child th': {
                                border: 0,
                              },
                            }}
                          >
                            <TableCell component='th' scope='row'>
                              {index + 1}
                            </TableCell>
                            <TableCell>{shelf.product_name}</TableCell>
                            <TableCell>
                              {shelf.created_at.split('T')[0]}
                            </TableCell>
                            <TableCell>
                              {shelf.expiry_date.split('T')[0]}
                            </TableCell>
                            <TableCell>{shelf.remaining_days}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
        </InnerConatiner>
      </ContentWrap>
    </Container>
  );
};

export default ExpiredProduct;
