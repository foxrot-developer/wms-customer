import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
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
  Typography,
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
  transferWithDraw,
} from '../Store/Customer/Actions/actionCreators';
import CloseIcon from '@mui/icons-material/Close';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import UndoIcon from '@mui/icons-material/Undo';
import SignatureCanvas from 'react-signature-canvas';

const OrderList = () => {
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.customer.orderList);
  const warehouse = useSelector((state) => state.customer.warehouse);
  const customer = useSelector((state) => state.customer.customer);

  const [transferModal, setTransferModal] = useState(false);
  const [transferWarehouse, setTransferWarehouse] = useState({
    order_id: '',
    transfer_date_time: '',
  });

  const [withdrawModal, setWithdrawModal] = useState(false);
  const [withdrawWarehouse, setWithdrawWarehouse] = useState({
    order_id: '',
    withdraw_date_time: '',
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

  const [isAccept, setIsAccept] = useState(false);

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
                  type='date'
                  fullWidth
                  variant='outlined'
                  label='وقت تاريخ التحويل'
                  value={transferWarehouse.transfer_date_time}
                  onChange={(e) =>
                    setTransferWarehouse({
                      ...transferWarehouse,
                      transfer_date_time: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  onClick={() => {
                    dispatch(
                      transferProductWarehouse(
                        {
                          ...transferWarehouse,
                          transfer_date_time: formatDateAndTimeString(
                            new Date(transferWarehouse.transfer_date_time)
                          ),
                        },
                        customer.id,
                        setTransferModal
                      )
                    );
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
      <Modal open={withdrawModal}>
        <ModalContainer>
          <ModalContent width='30%'>
            <HeaderContainer>
              <Header>انسحب</Header>
              <IconButton onClick={() => setWithdrawModal(false)}>
                <CloseIcon />
              </IconButton>
            </HeaderContainer>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  type='date'
                  fullWidth
                  variant='outlined'
                  label='وقت تاريخ التحويل'
                  value={withdrawWarehouse.withdraw_date_time}
                  onChange={(e) =>
                    setWithdrawWarehouse({
                      ...withdrawWarehouse,
                      withdraw_date_time: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h6'>إمضاء</Typography>
                <SignatureCanvas
                  penColor='black'
                  canvasProps={{
                    width: 500,
                    height: 200,
                    className: 'sigCanvas',
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      value={isAccept}
                      onChange={(e) => setIsAccept(e.target.checked)}
                    />
                  }
                  label='قبول مع الشروط والأحكام'
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={!isAccept}
                  onClick={() => {
                    dispatch(
                      transferWithDraw(
                        {
                          order_id: withdrawWarehouse.order_id,
                          withdraw_date_time: formatDateAndTimeString(
                            new Date(withdrawWarehouse.withdraw_date_time)
                          ),
                        },
                        customer.id,
                        setWithdrawModal
                      )
                    );
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
                                  ...transferWarehouse,
                                  order_id: shelf.id,
                                });
                                setTransferModal(true);
                              }}
                            >
                              <TransferWithinAStationIcon />
                            </IconButton>
                            <IconButton
                              onClick={() => {
                                setWithdrawWarehouse({
                                  ...withdrawWarehouse,
                                  order_id: shelf.id,
                                });
                                setWithdrawModal(true);
                              }}
                            >
                              <UndoIcon />
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
