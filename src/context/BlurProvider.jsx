import React, { createContext, useState } from 'react';

export const BlurContext = createContext(false);

function BlurProvider({ children }) {
  const [blurStatus, updateBlurStatus] = useState('');
  return (
    <div>
      <BlurContext.Provider
        value={{
          blurStatus: blurStatus,
          updateBlurStatus: updateBlurStatus,
        }}
      >
        {children}
      </BlurContext.Provider>
    </div>
  );
}

export default BlurProvider;
