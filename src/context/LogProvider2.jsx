import React, { createContext, useState } from 'react';

export const BoxLogContext2 = createContext(null);

function LogProvider2({ children }) {
  const [loginStatus2, updateLoginStatus2] = useState('');

  return (
    <BoxLogContext2.Provider
      value={{
        loginStatus2: loginStatus2,
        updateLoginStatus2: updateLoginStatus2,
      }}
    >
      {children}
    </BoxLogContext2.Provider>
  );
}

export default LogProvider2;
