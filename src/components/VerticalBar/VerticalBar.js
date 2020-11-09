import React from 'react';

import './VerticalBar.css';

const VerticalBar = ({ text }) => {
  return (
    <div className='bar'>
      <div className='left'></div>
      { text ? <div className='text'>{ text }</div> : null }
      <div className='right'></div>
    </div>
  );
};

export default VerticalBar;
