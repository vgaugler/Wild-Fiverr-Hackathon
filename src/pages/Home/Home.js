import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className='info'>
      <div className='content'>
        <div className='head'>
          <h1>
            Ready to find your personal{' '}
            <span style={{ color: 'green' }}> Mentor </span>{' '}
          </h1>
          <p>Fiverr Senpai is for you</p>

          <Link to='/products'>
            <button>Get Started</button>
          </Link>
        </div>
      </div>
      <div className='pic'></div>
    </div>
  );
}
