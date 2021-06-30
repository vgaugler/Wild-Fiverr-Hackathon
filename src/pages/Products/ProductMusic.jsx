import React, { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../utils/firebaseConfig';
import MentorCard from '../../components/MentorCard/MentorCard';
import './ProductList.css';
import { mentorContext } from '../../context/MentorContext';
const ProductMusic = () => {
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
      let mentor = list.filter((el) => el.activity.includes('Sound'))
      setMentorList(list);
      setFiltredMentor(mentor);
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
        <div
          className='heading-center'
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'space-around',
            }}
          >
            <h3 style={{ marginBottom: '25px', fontFamily: 'Macan' }}>
              {' '}
              15 mentor available
            </h3>
            <h1 style={{ margin: '0', fontFamily: 'Macan', fontSize: '4rem' }}>
              Find{' '}
              <span style={{ fontFamily: 'Domaine', fontSize: '4rem' }}>
                your's
              </span>
            </h1>
            <form
              style={{
                marginTop: '25px',
              }}
            >
              <label htmlFor='content'>
                <input
                  type='texte'
                  id='content'
                  className='searchMentor'
                  placeholder='search an activity, ex : data, engineer...'
                  onChange={(event) => handleChange(event)}
                  value={search}
                  style={{ outline: 'none' }}
                  autocomplete='off'
                />
              </label>
            </form>
          </div>
          <img
            src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624757/business-desktop-870-x1.png'
            alt=''
            style={{ width: '500px', height: 'auto' }}
          ></img>
        </div>
      </div>
      <div className="titleSearch">
      <h1>Music & Audio Mentor</h1>
      </div>
      <MentorCard mentorList={filtredMentor} />
    </>
  );
};
export default ProductMusic;