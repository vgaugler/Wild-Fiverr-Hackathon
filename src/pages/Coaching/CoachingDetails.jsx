/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react/cjs/react.development';
import ChatMentor from '../../components/Chat/ChatMentor';
import Ban from '../../images/edd.png';
import firebase from '../../utils/firebaseConfig';

function CoachingDetails() {
  const { id } = useParams();
  const [img, setImg] = useState();

  useEffect(() => {
    const mentor = firebase
      .database()
      .ref('mentor')
      .child(firebase.auth().currentUser.displayName)
      .child(id);

    mentor.on('value', (snapshot) => {
      setImg(snapshot.val().image);
    });
  }, []);
  return (
    <div style={{ marginTop: '80px' }}>
      <div className='boxHead'>
        <h1 style={{ textAlign: 'end', margin: '60px', fontSize: '3rem' }}>
          Just Chatting
        </h1>
        <img src={Ban} style={{ width: '500px', height: 'auto' }} alt=''></img>
      </div>
      <div
        // key={product.id}
        className='boxProgress'
        style={{ position: 'relative' }}
      >
        <h1
          style={{
            position: 'absolute',
            color: 'white',
            fontFamily: 'Macan',
            top: '15px',
            left: '36%',
            fontSize: '15px',
          }}
        >
          {/* Chat with {product.name}{' '} */}
        </h1>
        <img
          src={img}
          alt='user'
          style={{ width: '50%', objectFit: 'cover' }}
        />{' '}
        <ChatMentor id={id} />
      </div>
    </div>
  );
}

export default CoachingDetails;
