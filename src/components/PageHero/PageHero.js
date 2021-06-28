import React from 'react';
import './PageHero.css';

const PageHero = React.memo(function PageHero({ item, name }) {
  return (
    <div className='heading-center'>
      <h3>{/* {name} / {item} Items */}3 mentor</h3>
    </div>
  );
});

export default PageHero;
