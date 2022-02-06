import React, { Fragment } from 'react';
import { ContentArea } from '../Components/Dashboard/ContentArea/ContentArea';
import SideBar from '../Components/Dashboard/Sidebar/SideBar';
import { Container, ContentWrap } from '../Components/Global/GlobalStyle';

const Dashboard = () => {
  return (
    <Fragment>
      <Container>
        <ContentWrap>
          <SideBar />
          <ContentArea />
        </ContentWrap>
      </Container>
    </Fragment>
  );
};

export default Dashboard;
