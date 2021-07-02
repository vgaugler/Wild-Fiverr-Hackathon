import React from 'react';
import { Link } from 'react-router-dom';
import './Error.css';

function Error() {
  return (
    <div className='err'>
      <img
        style={{ height: '70vh', width: '35vw' }}
        src='../../images/Q2BAOd2.png'
        alt='404 error'
      />

      <h3>This page is in construction.</h3>
      <Link to='/products'>
        <button className='button'>Back to Mentors</button>
      </Link>
    </div>
  );
}

export default Error;
