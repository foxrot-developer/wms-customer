import {
  Button,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Modal,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideBar from '../Components/Dashboard/Sidebar/SideBar';
import {
  Container,
  ContentWrap,
  Header,
  ModalContainer,
  ModalContent,
  HeaderContainer,
} from '../Components/Global/GlobalStyle';
import {
  customerOrderList,
  getAllWarehouse,
  transferProductWarehouse,
} from '../Store/Customer/Actions/actionCreators';
import CloseIcon from '@mui/icons-material/Close';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';

const OrderList = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.customer.orderList);
  const warehouse = useSelector((state) => state.customer.warehouse);
  const customer = useSelector((state) => state.customer.customer);

  const [transferModal, setTransferModal] = useState(false);
  const [transferWarehouse, setTransferWarehouse] = useState({
    order_id: '',
    from_warehouse: '',
    to_warehouse: '',
    approve: 0,
  });

  const formatDateAndTimeString = (date) => {
    var dd = (date.getDate() < 10 ? '0' : '') + date.getDate();

    var MM = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);

    return `${date.getFullYear()}-${MM}-${dd} ${
      (date.getHours() < 10 ? '0' : '') + date.getHours()
    }:${(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}:${
      (date.getSeconds() < 10 ? '0' : '') + date.getSeconds()
    }`;
  };

  useEffect(() => {
    if (customer.id) {
      dispatch(customerOrderList(customer.id));
    }
    dispatch(getAllWarehouse());
  }, [customer]);

  return (
    <Container>
      <Modal open={transferModal}>
        <ModalContainer>
          <ModalContent>
            <HeaderContainer>
              <Header>نقل المستودع</Header>
              <IconButton onClick={() => setTransferModal(false)}>
                <CloseIcon />
              </IconButton>
            </HeaderContainer>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant='outlined'
                  label='من المستودع'
                  value={
                    warehouse.find(
                      (item) => item.id === transferWarehouse.from_warehouse
                    )?.name
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id='warehouse_idTo'>إلى المستودع</InputLabel>
                  <Select
                    fullWidth
                    labelId='مستودع'
                    id='warehouse_idTo'
                    value={transferWarehouse.to_warehouse}
                    onChange={(e) =>
                      setTransferWarehouse({
                        ...transferWarehouse,
                        to_warehouse: e.target.value,
                      })
                    }
                  >
                    {warehouse !== undefined &&
                      warehouse.map((item) => (
                        <MenuItem value={item.id}>{item.name}</MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={() => {
                    dispatch(transferProductWarehouse(transferWarehouse));
                  }}
                  variant='contained'
                >
                  نقل
                </Button>
              </Grid>
            </Grid>
          </ModalContent>
        </ModalContainer>
      </Modal>
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
                      <TableCell width={50}>معرف المنتج</TableCell>
                      <TableCell width={50}>الجرف</TableCell>
                      <TableCell width={50}>قوي</TableCell>
                      <TableCell width={50}>كمية</TableCell>
                      <TableCell width={50}>اسم الزبون</TableCell>
                      <TableCell width={50}>السعر الكلي</TableCell>
                      <TableCell width={50}>دفع</TableCell>
                      <TableCell width={50}>الباركود</TableCell>
                      <TableCell width={50}>مستودع</TableCell>
                      <TableCell width={50}>طلب معرف</TableCell>
                      <TableCell width={50}>أنشئت في</TableCell>
                      <TableCell width={50}>تاريخ الانتهاء</TableCell>
                      <TableCell width={50}>وقت تسجيل الوصول</TableCell>
                      <TableCell width={50}>تحقق من الوقت</TableCell>
                      <TableCell align='center' width={50}>
                        عدد
                      </TableCell>
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
                          <TableCell>{shelf.product_id}</TableCell>
                          <TableCell>{shelf.shelf_id}</TableCell>
                          <TableCell>{shelf.storage_type}</TableCell>
                          <TableCell>{shelf.quantity}</TableCell>
                          <TableCell>{customer.name}</TableCell>
                          <TableCell>{shelf.total_price}</TableCell>
                          <TableCell>
                            {shelf.paid === 1 ? 'Paid' : 'UnPaid'}
                          </TableCell>
                          <TableCell>{shelf.barcode}</TableCell>
                          <TableCell>
                            {
                              warehouse.find(
                                (item) => item.id === shelf.warehouse_id
                              )?.name
                            }
                          </TableCell>
                          <TableCell>{shelf.request_id}</TableCell>
                          <TableCell>
                            {formatDateAndTimeString(
                              new Date(shelf.created_at)
                            )}
                          </TableCell>
                          <TableCell>
                            {formatDateAndTimeString(
                              new Date(shelf.expiry_date)
                            )}
                          </TableCell>
                          <TableCell>
                            {formatDateAndTimeString(
                              new Date(shelf.checkin_time)
                            )}
                          </TableCell>
                          <TableCell>
                            {formatDateAndTimeString(
                              new Date(shelf.checkout_time)
                            )}
                          </TableCell>
                          <TableCell align='center'>
                            <IconButton
                              onClick={() => {
                                setTransferWarehouse({
                                  order_id: shelf.id,
                                  from_warehouse: shelf.warehouse_id,
                                  to_warehouse: '',
                                  approve: 0,
                                });
                                setTransferModal(true);
                              }}
                            >
                              <TransferWithinAStationIcon />
                            </IconButton>
                          </TableCell>
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
