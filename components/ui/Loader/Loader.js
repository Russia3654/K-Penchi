import React from 'react';
import cl from './Loader.module.css';

const Loader = ({text}) => {
  return (
    <div className="loader">
      <div className="spinner"></div>
      <p>{text}...</p>
    </div>
  );
};

export default Loader;
