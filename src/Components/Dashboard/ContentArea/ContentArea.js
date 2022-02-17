import React from 'react';
import { Container, Row, Main } from './ContentAreaStyled';
import { StatsCard } from './StatsCard/StatsCard';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useTranslation } from 'react-i18next';

export const ContentArea = () => {
  const { t } = useTranslation();
  return (
    <>
      <Main>
        <Container>
          <Row className='row d-flex justify-content-center w-100 m-0'>
            <StatsCard
              icon={<ShoppingBagIcon />}
              title={t('orderList')}
              link='/orders-list'
            />
            <StatsCard
              icon={<ProductionQuantityLimitsIcon />}
              title={t('ProductsExpiry')}
              link='/expired-list'
            />
            <StatsCard
              icon={<ProductionQuantityLimitsIcon />}
              title={t('invoice')}
              link='/inovices'
            />
          </Row>
        </Container>
      </Main>
    </>
  );
};
