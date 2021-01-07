import React from 'react';

interface IILineIoconsProps {
  className?: string;
}

const LineIcon: React.FC<IILineIoconsProps> = ({ children, className }) => {
  return (
    <i aria-hidden="true" className={`lni lni-${children}${className ? ' ' + className : ''}`}></i>
  );
};

export default LineIcon;
