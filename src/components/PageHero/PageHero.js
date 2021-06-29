import React from 'react';
import './PageHero.css';

const PageHero = React.memo(function PageHero({ item, name }) {
  return (
    <div
      className='heading-center'
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
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
        <h3 style={{ marginBottom: '25px', fontFamily: 'Macan' }}>
          {' '}
          15 mentor available
        </h3>
        <h1 style={{ margin: '0', fontFamily: 'Macan', fontSize: '4rem' }}>
          Find{' '}
          <span style={{ fontFamily: 'Domaine', fontSize: '4rem' }}>
            your's
          </span>
        </h1>
      </div>
      <img
        src='https://fiverr-res.cloudinary.com/q_auto,f_auto,w_870,dpr_1.0/v1/attachments/generic_asset/asset/d9c17ceebda44764b591a8074a898e63-1599597624757/business-desktop-870-x1.png'
        alt=''
        style={{ width: '500px', height: 'auto' }}
      ></img>
    </div>
  );
});

export default PageHero;
