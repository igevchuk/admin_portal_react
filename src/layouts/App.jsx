import React from 'react';
import { Switch, Route } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import Container from '@components/Container/Container';
import Header from '@components/Header/Header';
import Sidebar from '@components/Sidebar/Sidebar';
import dashboardRoutes from '@routes/dashboard';

import theme from 'sass-extract-loader?{"plugins": ["sass-extract-js"]}!./../_variables.scss';

const Wrapper = styled.div`
  position: relative;
  top: 0;
  height: 100vh
`;
const MainPanel = styled.div`
  overflow: auto;
  position: relative;
  float: right;
  max-height: 100%;
  width: calc(100% - ${props => props.theme.sidebarWidth})}
  overflow-scrolling: touch
`;
const Content = styled.div`
  margin-top: ${props => props.theme.headerHeight};
  padding: 30px 15px;
  min-height: calc(100vh - ${props => props.theme.headerHeight});
`;

const switchRoutes = (
  <Switch>
      {
        dashboardRoutes.map((prop, key) => {
          return (
            <Route 
              exact={ prop.exact }
              path={ prop.path } 
              component={ prop.component } 
              key={ key } 
            />
          )
        })
      }
    </Switch>
);

const App = (props) => {
  return (
    <ThemeProvider theme={theme}>
      <Wrapper>
        <Sidebar routes={dashboardRoutes} {...props} />

        <MainPanel>
          <Header />

          <Content>
            <Container>
              {switchRoutes}
            </Container>
          </Content>
        </MainPanel>
      </Wrapper>
    </ThemeProvider>
  );
};

export default App;