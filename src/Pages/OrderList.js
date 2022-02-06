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
import { useDispatch, useSelector } from 'react-redux';
import SideBar from '../Components/Dashboard/Sidebar/SideBar';
import {
  Container,
  ContentWrap,
  Header,
} from '../Components/Global/GlobalStyle';
import { customerOrderList } from '../Store/Customer/Actions/actionCreators';

const OrderList = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.customer.orderList);
  console.log(orderList);
  const customer = useSelector((state) => state.customer.customer);
  console.log(customer);
  useEffect(() => {
    if (customer.id) {
      dispatch(customerOrderList(customer.id));
    }
  }, [customer]);
  return (
    <Container>
      <ContentWrap>
        <SideBar />
        <div className='container p-md-5 '>
          <div className='row'>
            <div className='col-12'>
              <Header>ائحة الطلبات</Header>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 450 }} aria-label='simple table'>
                  <TableHead>
                    <TableRow>
                      <TableCell width={50}>#</TableCell>
                      <TableCell width={50}>اسم المنتج</TableCell>
                      <TableCell width={50}>قوي</TableCell>
                      <TableCell width={50}>وصف</TableCell>
                      <TableCell width={50}>السعر</TableCell>
                      <TableCell width={50}>كمية</TableCell>
                      <TableCell width={50}>نوع الشحن</TableCell>
                      <TableCell width={50}>هوية الزبون</TableCell>
                      <TableCell width={50}>السعر الكلي</TableCell>
                      <TableCell width={50}>دفع</TableCell>
                      <TableCell width={50}>الباركود</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {orderList !== undefined &&
                      orderList.map((shelf, index) => (
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
                          <TableCell>{shelf.storage_type}</TableCell>
                          <TableCell>{shelf.description}</TableCell>
                          <TableCell>{shelf.price}</TableCell>
                          <TableCell>{shelf.quantity}</TableCell>
                          <TableCell>{shelf.shipment_type}</TableCell>
                          <TableCell>{shelf.customer_id}</TableCell>
                          <TableCell>{shelf.total_price}</TableCell>
                          <TableCell>{shelf.paid}</TableCell>
                          <TableCell>{shelf.barcode}</TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </ContentWrap>
    </Container>
  );
};

export default OrderList;
