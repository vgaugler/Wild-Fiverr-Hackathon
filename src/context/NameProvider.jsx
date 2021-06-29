import React, { createContext, useState } from 'react';

export const NameContext = createContext('unknown');

function NameProvider({ children }) {
  const [name, updateName] = useState('');
  return (
    <NameContext.Provider
      value={{
        name: name,
        updateName: updateName,
      }}
    >
      {children}
    </NameContext.Provider>
  );
}

export default NameProvider;
