import React from 'react';

const WindType = ({ speed }) => {
  const windRanges = [
    { max: 3, type: 'Calm' },
    { max: 7, type: 'Light Air' },
    { max: 12, type: 'Light Breeze' },
    { max: 18, type: 'Gentle Breeze' },
    { max: 24, type: 'Moderate Breeze' },
    { max: 31, type: 'Fresh Breeze' },
    { max: 38, type: 'Strong Breeze' },
    { max: 46, type: 'Near Gale' },
    { max: 54, type: 'Gale' },
    { max: 63, type: 'Strong Gale' },
    { max: 75, type: 'Whole Gale' },
    { max: 88, type: 'Storm Force' },
    { max: Infinity, type: 'Hurricane Force' },
  ];

  const getWindType = () => {
    const range = windRanges.find(range => speed <= range.max);
    return range ? range.type : 'Unknown'; 
  };

  return <span>{getWindType()}</span>;
};

export default WindType;
