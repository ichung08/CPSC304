import React from 'react';

const Home = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '20vh',
        flexDirection: 'column', // add this line to set the direction to column
      }}>
      <h1 style={{ textShadow: '2px 2px 4px #ccc' }}>CPSC 304 Group 39</h1>
      <p>Vanessa Lee, Isaac Chung, Kitty Liu</p>
    </div>
  );
};

export default Home;
