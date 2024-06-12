import React from 'react';
import dino from '../assests/img/dino.jpg'

const UserOffline = () => {
  return (
    <div className="user-offline-container">
      <h1 className="user-offline-heading">🔴 Offline!</h1>
      <div className="w-full flex justify-center">
          <img src={dino} alt='dino ate this image' className='w-60'/>
      </div>
      <p className="user-offline-message">
        Sorry, it seems that you are currently offline.
      </p>
    </div>
  );
};

export default UserOffline;