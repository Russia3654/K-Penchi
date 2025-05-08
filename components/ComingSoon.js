import React from 'react';

const ComingSoon = ({ imageSrc }) => {

  return (
    <div className="coming-soon">
      <img src={imageSrc} alt="Coming Soon" />

      <h2>Coming Soon</h2>

      <p>Stay tuned for updates!</p>
    </div>
  );
};

export default ComingSoon;
