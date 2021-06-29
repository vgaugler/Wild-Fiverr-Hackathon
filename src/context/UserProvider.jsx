import React, { createContext, useState } from 'react';

export const UserContext = createContext(null);

function UserProvider({ children }) {
  const [isSignedIn, updateSignedIn] = useState('');

  return (
    <UserContext.Provider
      value={{
        isSignedIn: isSignedIn,
        updateSignedIn: updateSignedIn,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserProvider;
