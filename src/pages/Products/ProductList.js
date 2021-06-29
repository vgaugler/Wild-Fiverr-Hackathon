import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../utils/firebaseConfig';
import MentorCard from '../../components/MentorCard/MentorCard';
const ProductList = () => {
  const [mentorList, setMentorList] = useState([]);

  useEffect(() => {
    const mentor = firebase.database().ref('user');

    mentor.on('value', (snapshot) => {
      let previousList = snapshot.val();
      let list = [];
      for (let id in previousList) {
        list.push({ id, ...previousList[id] });
      }
      setMentorList(list);
      console.log(mentorList);
    });
  }, []);
  return (
    <>
      <MentorCard mentorList={mentorList} />
    </>
  );
};
export default ProductList;
