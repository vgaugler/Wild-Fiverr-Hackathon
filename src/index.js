import React from 'react';
import ReactDOM from 'react-dom';
import LogProvider from './context/LogProvider';
import LogProvider2 from './context/LogProvider2';
import UserProvider from './context/UserProvider';
import BlurProvider from './context/BlurProvider';
import NameProvider from './context/NameProvider';
import AlertTemplate from 'react-alert-template-basic';

import App from './App';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import './App.css';
const options = {
  // you can also just use 'bottom center'
  position: positions.TOP_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
};
ReactDOM.render(
  <LogProvider>
    <LogProvider2>
      <UserProvider>
        <BlurProvider>
          <NameProvider>
            <AlertProvider template={AlertTemplate} {...options}>
              <App />
            </AlertProvider>
          </NameProvider>
        </BlurProvider>
      </UserProvider>
    </LogProvider2>
  </LogProvider>,
  document.getElementById('root')
);
