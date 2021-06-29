import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import Section2 from './Section2';
import Section3 from './Section3';

// Import accordion components
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';

// import Swiper core and required modules
import SwiperCore, { Navigation, A11y, EffectFade, Autoplay } from 'swiper';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/swiper-bundle.css';

import images from '../../utils/homeImages';
SwiperCore.use([Navigation, A11y, EffectFade, Autoplay]);

const items = [
  {
    uuid: 1,
    heading: 'HEADING 1 HEADING 1 HEADING 1',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias sit natus corporis laudantium? Voluptatibus sunt, eveniet rerum vero ut porro sed, ipsum culpa optio at quidem numquam',
  },
  {
    uuid: 2,
    heading: 'HEADING 2',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias sit natus corporis laudantium? Voluptatibus sunt, eveniet rerum vero ut porro sed, ipsum culpa optio at quidem numquam',
  },
  {
    uuid: 3,
    heading: 'HEADING 3',
    content:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias sit natus corporis laudantium? Voluptatibus sunt, eveniet rerum vero ut porro sed, ipsum culpa optio at quidem numquam',
  },
];

export default function Home() {
  return (
    <div>
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

          <Link to='/products'>
            <button>Get Started</button>
          </Link>
        </div>
        <div className='concept'>
          <Accordion className='accordion' allowZeroExpanded>
            {items.map((item) => (
              <AccordionItem className='accordion__item' key={item.uuid}>
                <AccordionItemHeading>
                  <AccordionItemButton className='accordion__button'>
                    {item.heading}
                  </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel className='accordion__panel'>{item.content}</AccordionItemPanel>
              </AccordionItem>
            ))}
          </Accordion>
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
