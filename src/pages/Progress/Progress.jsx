/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from 'react';
import MentorCard from '../../components/MentorCard/MentorCard';
import { UserContext } from '../../context/UserProvider';
import firebase from '../../utils/firebaseConfig';
const Progress = () => {
  const [mentorList, setMentorList] = useState([]);
  const { isSignedIn } = useContext(UserContext);
  useEffect(() => {
    if (isSignedIn) {
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
      });
    }
  }, [isSignedIn]);

  return (
    <div>
      <div style={{ marginTop: '130px' }}>
        <div
          className='heading-center'
          style={{
            backgroundColor: '#584AFF',
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
            src='/images/banmentor.jpg'
            alt=''
            style={{ width: '50%', height: 'auto', objectFit: 'cover' }}
          ></img>
        </div>
      </div>
      <MentorCard mentorList={mentorList} />
    </div>
  );
};

export default Progress;
