import React, { createContext, useState } from 'react';

export const BoxLogContext = createContext(null);

function LogProvider({ children }) {
  const [loginStatus, updateLoginStatus] = useState('');

  return (
    <BoxLogContext.Provider
      value={{
        loginStatus: loginStatus,
        updateLoginStatus: updateLoginStatus,
      }}
    >
      {children}
    </BoxLogContext.Provider>
  );
}

export default LogProvider;
