import React from 'react';

const WindType = ({ speed }) => {
  const getWindType = () => {
    if (speed <= 3) {
      return 'Calm';
    } else if (speed <= 7) {
      return 'Light Air';
    } else if (speed <= 12) {
      return 'Light Breeze';
    } else if (speed <= 18) {
      return 'Gentle Breeze';
    } else if (speed <= 24) {
      return 'Moderate Breeze';
    } else if (speed <= 31) {
      return 'Fresh Breeze';
    } else if (speed <= 38) {
      return 'Strong Breeze';
    } else if (speed <= 46) {
      return 'Near Gale';
    } else if (speed <= 54) {
      return 'Gale';
    } else if (speed <= 63) {
      return 'Strong Gale';
    } else if (speed <= 75) {
      return 'Whole Gale';
    } else if (speed <= 75) {
      return 'Storm Force';
    } else {
      return 'Hurricane Force';
    }
  };

  return <span> {getWindType()}</span>;
};

export default WindType;
