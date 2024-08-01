import React from 'react';
import './../../css/Loader.css';

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loader-background"></div>
      <div className="circle-container">
        <div className="circle red"></div>
        <div className="circle blue"></div>
        <div className="circle green"></div>
        <div className="circle yellow"></div>
      </div>
    </div>
  );
}

export default Loader;
