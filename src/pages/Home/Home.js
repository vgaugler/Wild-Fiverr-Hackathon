import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Section2 from './Section2';
import Section3 from './Section3';

export default function Home() {
  return (
    <div>
      <div className='info'>
        <div className='content'>
          <div className='head'>
            <h1>
              Ready to find your personal{' '}
              <span style={{ color: '#00732e' }}> Mentor ~ </span>{' '}
            </h1>
            <p>Fiverr Senpai is for you</p>

            <Link to='/products'>
              <button>Get Started</button>
            </Link>
          </div>
        </div>
        <div className='pic'></div>
      </div>
      <Section2></Section2>
      <Section3></Section3>
    </div>
  );
}
