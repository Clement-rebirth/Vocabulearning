import React from 'react';

import './NothingToShow.css';

const NothingToShow = ({ message, src, alt, className }) => (
  <div className={`nothing-to-show ${className ? className : ''}`}>
    <img src={src} alt={alt}/>
    <p className='nothing-to-show-message'>{ message }</p>
  </div>
);
 
export default NothingToShow;
