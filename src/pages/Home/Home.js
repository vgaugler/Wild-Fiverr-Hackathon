import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className='info'>
      <div className='content'>
        <div className='head'>
          <h1>
            Find the perfect <span style={{ color: '#00732e' }}>mentor</span> for your freelance
            growth
          </h1>
          <div>
            Fiverr Senpai - access expert know-how and support from pillars of the community
          </div>

          <Link to='/products'>
            <button>Get Started</button>
          </Link>
        </div>
        <div className='concept'>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. A sint iusto rerum alias
            architecto voluptas ab rem dignissimos.. Lorem, ipsum dolor sit amet consectetur
            adipisicing elit. A sint iusto rerum alias architecto voluptas ab rem dignissimos..
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
      <div className='pic'></div>
    </div>
  );
}
