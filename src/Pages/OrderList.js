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
import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SideBar from '../Components/Dashboard/Sidebar/SideBar';
import {
  Container,
  ContentWrap,
  Header,
  ModalContainer,
  ModalContent,
  HeaderContainer,
  InnerConatiner,
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
import { useTranslation } from 'react-i18next';

const OrderList = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const orderList = useSelector((state) => state.customer.orderList);
  const customer = useSelector((state) => state.customer.customer);
  const signSignature = useRef();
  const [transferModal, setTransferModal] = useState(false);
  const [transferWarehouse, setTransferWarehouse] = useState({
    order_id: '',
    transfer_date_time: {
      date: '',
      time: '',
    },
  });

  const [withdrawModal, setWithdrawModal] = useState(false);
  const [withdrawWarehouse, setWithdrawWarehouse] = useState({
    order_id: '',
    withdraw_date_time: {
      date: '',
      time: '',
    },
    quantity: '',
    tempQuantity: 0,
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
  function convertCanvasToImage(url) {
    let image = new Image();
    image.src = url;
    return image.src.replace('data:image/png;base64,', '');
  }
  return (
    <Container>
      <Modal open={transferModal}>
        <ModalContainer>
          <ModalContent>
            <HeaderContainer>
              <Header>{t('transfer')}</Header>
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
                  label={t('date')}
                  value={transferWarehouse.transfer_date_time.date}
                  onChange={(e) =>
                    setTransferWarehouse({
                      ...transferWarehouse,
                      transfer_date_time: {
                        ...transferWarehouse.transfer_date_time,
                        date: e.target.value,
                      },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant='outlined'
                  label={t('time')}
                  type='time'
                  value={transferWarehouse.transfer_date_time.time}
                  onChange={(e) =>
                    setTransferWarehouse({
                      ...transferWarehouse,
                      transfer_date_time: {
                        ...transferWarehouse.transfer_date_time,
                        time: e.target.value,
                      },
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
                          transfer_date_time:
                            transferWarehouse.transfer_date_time.date +
                            ' ' +
                            transferWarehouse.transfer_date_time.time,
                        },
                        customer.id,
                        setTransferModal
                      )
                    );
                  }}
                  variant='contained'
                >
                  {t('transfer')}
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
              <Header>{t('Withdrawalrequest')}</Header>
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
                  label={t('date')}
                  value={withdrawWarehouse.withdraw_date_time.date}
                  onChange={(e) =>
                    setWithdrawWarehouse({
                      ...withdrawWarehouse,
                      withdraw_date_time: {
                        ...withdrawWarehouse.withdraw_date_time,
                        date: e.target.value,
                      },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant='outlined'
                  label={t('time')}
                  type='time'
                  value={withdrawWarehouse.withdraw_date_time.time}
                  onChange={(e) =>
                    setWithdrawWarehouse({
                      ...withdrawWarehouse,
                      withdraw_date_time: {
                        ...withdrawWarehouse.withdraw_date_time,
                        time: e.target.value,
                      },
                    })
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel htmlFor='quantity'>{t('quantity')}</InputLabel>
                  <Select
                    id='quantity'
                    onChange={(e) => {
                      setWithdrawWarehouse({
                        ...withdrawWarehouse,
                        quantity: e.target.value,
                      });
                    }}
                  >
                    {withdrawWarehouse.tempQuantity > 0 &&
                      Array(withdrawWarehouse.tempQuantity)
                        .fill()
                        .map((_, index) => (
                          <MenuItem key={index} value={index + 1}>
                            {index + 1}
                          </MenuItem>
                        ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <Typography variant='h6'>{t('signature')}</Typography>
                <SignatureCanvas
                  ref={signSignature}
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
                  label={t('termsconditions')}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  disabled={!isAccept}
                  onClick={() => {
                    const data = new FormData();
                    data.append(
                      'signature',
                      signSignature.current
                        .getTrimmedCanvas()
                        .toDataURL('image/png')
                    );
                    data.append('quantity', withdrawWarehouse.quantity);
                    data.append(
                      'withdraw_date_time',
                      withdrawWarehouse.withdraw_date_time.date +
                        ' ' +
                        withdrawWarehouse.withdraw_date_time.time
                    );
                    data.append('order_id', withdrawWarehouse.order_id);

                    dispatch(
                      transferWithDraw(
                        {
                          signature: signSignature.current
                            .getTrimmedCanvas()
                            .toDataURL('image/png'),
                          quantity: withdrawWarehouse.quantity,
                          withdraw_date_time:
                            withdrawWarehouse.withdraw_date_time.date +
                            ' ' +
                            withdrawWarehouse.withdraw_date_time.time,
                          order_id: withdrawWarehouse.order_id,
                        },
                        customer.id,
                        setWithdrawModal
                      )
                    );
                  }}
                  variant='contained'
                >
                  {t('withdrawal')}
                </Button>
              </Grid>
            </Grid>
          </ModalContent>
        </ModalContainer>
      </Modal>
      <ContentWrap>
        <SideBar />
        <InnerConatiner>
          <div className='container p-md-5 '>
            <div className='row'>
              <div className='col-12'>
                <Header>{t('orderList')}</Header>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 450 }} aria-label='simple table'>
                    <TableHead>
                      <TableRow>
                        <TableCell width={50}>#</TableCell>
                        <TableCell width={50}>{t('productName')}</TableCell>
                        <TableCell width={50}>{t('shelfNumber')}</TableCell>
                        <TableCell width={50}>{t('storageType')}</TableCell>
                        <TableCell width={50}>{t('quantity')}</TableCell>
                        <TableCell width={50}>{t('customerName')}</TableCell>
                        <TableCell width={50}>{t('totalprice')}</TableCell>
                        <TableCell width={50}>{t('Pay')}</TableCell>
                        <TableCell width={50}>{t('barcode')}</TableCell>
                        <TableCell width={50}>{t('createdAt')}</TableCell>
                        <TableCell width={50}>{t('ExpiryDate')}</TableCell>
                        <TableCell width={50}>{t('checkedInTime')}</TableCell>
                        <TableCell width={50}>{t('checkOutTime')}</TableCell>
                        <TableCell align='center' width={50}>
                          {t('action')}
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
                            <TableCell>{shelf.product_name}</TableCell>
                            <TableCell>{shelf.shelf_number}</TableCell>
                            <TableCell>{shelf.storage_type}</TableCell>
                            <TableCell>{shelf.quantity}</TableCell>
                            <TableCell>{customer.name}</TableCell>
                            <TableCell>{shelf.total_price}</TableCell>
                            <TableCell>
                              {shelf.paid === 1 ? 'Paid' : 'UnPaid'}
                            </TableCell>
                            <TableCell>{shelf.barcode}</TableCell>
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
                                    tempQuantity: shelf.quantity,
                                  });
                                  console.log(shelf.quantity);
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
        </InnerConatiner>
      </ContentWrap>
    </Container>
  );
};

export default OrderList;
