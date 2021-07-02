import React from 'react';
import { useParams } from 'react-router-dom';
import Chat from '../../components/Chat/Chat';
import ChatMentor from '../../components/Chat/ChatMentor';
import Ban from '../../images/edd.png';

function CoachingDetails() {
  const { id } = useParams();
  return (
    <div style={{ marginTop: '80px' }}>
      <div className='boxHead'>
        <h1 style={{ textAlign: 'end', margin: '60px', fontSize: '3rem' }}>
          Just Chatting
        </h1>
        <img src={Ban} style={{ width: '500px', height: 'auto' }}></img>
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
          // src={product.image}
          // alt={product.name}
          style={{ width: '50%', objectFit: 'cover' }}
        />{' '}
        <ChatMentor id={id} />
      </div>
    </div>
  );
}

export default CoachingDetails;
