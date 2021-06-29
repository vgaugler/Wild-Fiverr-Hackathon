import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Section2 from './Section2';
import Section3 from './Section3';

// import Swiper core and required modules
import SwiperCore, { Navigation, A11y, EffectFade, Autoplay } from 'swiper';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

import images from '../../utils/homeImages';
SwiperCore.use([Navigation, A11y, EffectFade, Autoplay]);

export default function Home() {
  return (
    <div>
      <div className='info'>
        <div className='content'>
          <div className='head'>
            <h1>
              Find the perfect <span style={{ color: '#00732e' }}>mentor</span>{' '}
              for your freelance growth
            </h1>
            <div>
              Fiverr Senpai - access expert know-how and support from pillars of
              the community
            </div>

            <Link to='/products'>
              <button>Get Started</button>
            </Link>
          </div>

          <div className='concept'>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. A sint
              iusto rerum alias architecto voluptas ab rem dignissimos.. Lorem,
              ipsum dolor sit amet consectetur adipisicing elit. A sint iusto
              rerum alias architecto voluptas ab rem dignissimos.. Lorem, ipsum
              dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
        <Swiper
          effect='fade'
          autoplay
          loop
          fadeEffect={{ crossFade: true }}
          speed={700}
          slidesPerView={1}
          // navigation
        >
          {images.map((image) => (
            <SwiperSlide>
              <img className='swiper__image' src={image.url} alt={image.desc} />
              <p className='swiper__text'>{image.desc}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div>
        <Section2></Section2>
        <Section3></Section3>
      </div>
    </div>
  );
}
