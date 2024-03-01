import React from 'react';

const ProgressBar = ({ percent }) => {
  const containerStyles = {
    width: '100%',
    backgroundColor: '#e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
  };

  const barStyles = {
    width: `${percent}%`,
    height: '20px',
    backgroundColor: '#4a148c',
    transition: 'width 0.3s ease-in-out',
  };

  return (
    <div style={containerStyles}>
      <div style={barStyles}></div>
    </div>
  );
};

export default ProgressBar;
