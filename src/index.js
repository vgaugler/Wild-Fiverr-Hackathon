import React from 'react';
import ReactDOM from 'react-dom';
import LogProvider from './context/LogProvider';
import LogProvider2 from './context/LogProvider2';
import UserProvider from './context/UserProvider';
import BlurProvider from './context/BlurProvider';
import NameProvider from './context/NameProvider';

import App from './App';

import './App.css';

ReactDOM.render(
  <LogProvider>
    <LogProvider2>
      <UserProvider>
        <BlurProvider>
          <NameProvider>
            <App />
          </NameProvider>
        </BlurProvider>
      </UserProvider>
    </LogProvider2>
  </LogProvider>,
  document.getElementById('root')
);
