/* eslint-disable react-hooks/rules-of-hooks */

import { createContext, useState } from 'react';

export const mentorContext = createContext();

const MentorProvider = ({ children }) => {

  const [mentorList, setMentorList] = useState([]);

  return (
    <mentorContext.Provider value={ {mentorList, setMentorList }}>
      {children}
    </mentorContext.Provider>
  );
};

export default MentorProvider;