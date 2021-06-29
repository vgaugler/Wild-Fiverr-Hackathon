import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../../components/PageHero/PageHero';
import firebase from '../../utils/firebaseConfig';
import MentorCard from '../../components/MentorCard/MentorCard';
import './ProductList.css';
import { mentorContext } from '../../context/MentorContext';
const ProductList = () => {
  const { mentorList, setMentorList } = useContext(mentorContext);
  console.log(mentorList);

  const [search, setSearch] = useState('');
  const [filtredMentor, setFiltredMentor] = useState([]);

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  useEffect(() => {
    const mentor = firebase.database().ref('user');

    mentor.on('value', (snapshot) => {
      let previousList = snapshot.val();
      let list = [];
      for (let id in previousList) {
        list.push({ id, ...previousList[id] });
      }
      setMentorList(list);
      setFiltredMentor(list);
      console.log(mentorList);
      console.log(filtredMentor);
    });
  }, []);

  useEffect(() => {
    let temp = mentorList.filter(
      (el) => search && el.activity.toLowerCase().includes(search)
    );
    console.log(temp);
    setFiltredMentor(temp);
    if (!temp.length) {
      setFiltredMentor(mentorList);
    }
  }, [search]);

  return (
    <>
      <div style={{ marginTop: '80px' }}>
        <PageHero />

        <form
          style={{
            position: 'absolute',
            top: '324px',
            left: '35px',
            zIndex: '200000000',
            transform: 'translate(35%, 28%)',
          }}
        >
          <label htmlFor='content'>
            <input
              type='texte'
              id='content'
              className='searchMentor'
              placeholder='search an activity'
              onChange={(event) => handleChange(event)}
              value={search}
              style={{ outline: 'none' }}
            />
          </label>
        </form>
      </div>
      <MentorCard mentorList={filtredMentor} />
    </>
  );
};
export default ProductList;
