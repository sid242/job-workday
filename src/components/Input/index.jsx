import React from 'react';
import './index.scss';

const index = ({ className, type, ...props }) => {
  return (
    <div className={`form-group ${className}`}>
      <input {...props} type={type ?? 'text'} className='form-control' />
    </div>
  );
};

export default index;
