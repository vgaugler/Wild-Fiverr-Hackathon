import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import MentorCard from '../../components/MentorCard/MentorCard';
import firebase from '../../utils/firebaseConfig';
const Progress = () => {
  const [mentorList, setMentorList] = useState([]);

  useEffect(() => {
    const mentor = firebase
      .database()
      .ref('mentor')
      .child(firebase.auth().currentUser.uid);
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
    <div>
      <div style={{ marginTop: '130px' }}>
        <div
          className='heading-center'
          style={{
            backgroundColor: '#0D084D',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            overflow: 'hidden',
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
            <h3
              style={{
                marginBottom: '25px',
                fontFamily: 'Macan',
                color: 'white',
              }}
            >
              {mentorList.length} mentor available
            </h3>
            <h1
              style={{
                margin: '0',
                fontFamily: 'Macan',
                fontSize: '4rem',
                color: 'white',
              }}
            >
              Your{' '}
              <span
                style={{
                  fontFamily: 'Domaine',
                  fontSize: '4rem',
                  color: 'white',
                }}
              >
                mentors
              </span>
            </h1>
          </div>
          <img
            src='images/prof.jpeg'
            alt=''
            style={{ width: '353px', objectFit: 'cover' }}
          ></img>
        </div>
      </div>
      <MentorCard mentorList={mentorList} />
    </div>
  );
};

export default Progress;
