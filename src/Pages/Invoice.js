import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideBar from '../Components/Dashboard/Sidebar/SideBar';
import {
  Container,
  ContentWrap,
  Header,
  InnerConatiner,
} from '../Components/Global/GlobalStyle';
import { getCustomerInvoice } from '../Store/Customer/Actions/actionCreators';

const Invoice = () => {
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.customer.invoice);
  const customer = useSelector((state) => state.customer.customer);
  useEffect(() => {
    dispatch(getCustomerInvoice(customer.id));
  }, []);
  return (
    <Container>
      <ContentWrap>
        <SideBar />
        <InnerConatiner>
          <div className='container p-md-5 '>
            <div className='row'>
              <div className='col-6'>
                <h2>فاتورة</h2>
              </div>
            </div>

            <div className='row'>
              <div className='col-6'>
                <Header>دفع</Header>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 450 }} aria-label='simple table'>
                    <TableHead>
                      <TableCell scope='col'>#</TableCell>
                      <TableCell scope='col'>اسم المنتج</TableCell>
                      <TableCell scope='col'>كمية</TableCell>
                      <TableCell scope='col'>السعر الكلي</TableCell>
                      <TableCell scope='col'>اسم</TableCell>
                    </TableHead>
                    <TableBody>
                      {invoice !== undefined &&
                        invoice.paid !== undefined &&
                        invoice.paid.data.length > 0 &&
                        invoice.paid?.data.map((shelf, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component='th' scope='row'>
                              {index + 1}
                            </TableCell>
                            <TableCell>{shelf.product_name}</TableCell>
                            <TableCell>{shelf.quantity}</TableCell>
                            <TableCell>{shelf.total_price}</TableCell>
                            <TableCell>{shelf.name}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Header>مجموع: {invoice?.paid?.total[0].total_amount}</Header>
              </div>
              <div className='col-6'>
                <Header>غير مدفوع الأجر</Header>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 450 }} aria-label='simple table'>
                    <TableHead>
                      <TableCell scope='col'>#</TableCell>
                      <TableCell scope='col'>اسم المنتج</TableCell>
                      <TableCell scope='col'>كمية</TableCell>
                      <TableCell scope='col'>السعر الكلي</TableCell>
                      <TableCell scope='col'>اسم</TableCell>
                    </TableHead>
                    <TableBody>
                      {invoice !== undefined &&
                        invoice.unpaid !== undefined &&
                        invoice.unpaid?.data.length > 0 &&
                        invoice.unpaid.data.map((shelf, index) => (
                          <TableRow
                            key={index}
                            sx={{
                              '&:last-child td, &:last-child th': { border: 0 },
                            }}
                          >
                            <TableCell component='th' scope='row'>
                              {index + 1}
                            </TableCell>
                            <TableCell>{shelf.product_name}</TableCell>
                            <TableCell>{shelf.quantity}</TableCell>
                            <TableCell>{shelf.total_price}</TableCell>
                            <TableCell>{shelf.name}</TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Header>مجموع: {invoice?.unpaid?.total[0].total_amount}</Header>
              </div>
            </div>
          </div>
        </InnerConatiner>
      </ContentWrap>
    </Container>
  );
};

export default Invoice;
