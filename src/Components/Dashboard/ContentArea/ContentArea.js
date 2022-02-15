import React from 'react';
import { Container, Row, Main } from './ContentAreaStyled';
import { StatsCard } from './StatsCard/StatsCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';

export const ContentArea = () => {
  return (
    <>
      <Main>
        <Container>
          <Row className='row d-flex justify-content-center w-100 m-0'>
            <StatsCard
              icon={<ShoppingBagIcon />}
              title='لائحة الطلبات'
              link='/orders-list'
            />
            <StatsCard
              icon={<ProductionQuantityLimitsIcon />}
              title='منتجات منتهية الصلاحية'
              link='/expired-list'
            />
            <StatsCard
              icon={<ProductionQuantityLimitsIcon />}
              title='دفع'
              link='/inovices'
            />
          </Row>
        </Container>
      </Main>
    </>
  );
};
