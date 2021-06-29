import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

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
    <div className="info">
      <div className="content">
        <div className="head">
          <h1>
            Ready to find your personal{' '}
            <span style={{ color: '#00732e' }}> Mentor </span>{' '}
          </h1>
          <p>Fiverr Senpai is for you</p>
          <Link to="/products">
            <button>Get Started</button>
          </Link>
        </div>
      </div>
      <Swiper
        effect="fade"
        autoplay
        loop
        fadeEffect={{ crossFade: true }}
        speed={700}
        slidesPerView={1}
        // navigation
      >
        {images.map((image) => (
          <SwiperSlide>
            <img className="swiper__image" src={image.url} alt={image.desc} />
            <p className="swiper__text">{image.desc}</p>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
