import './App.css';
import React from 'react';

import Home from './pages/Home'
import Logo from './pages/LogoDisplay'

import Player from './pages/Player';
import Tournament from './pages/Tournament';
import styled from 'styled-components';

import kirbyImage from './font/kirby.png';
import marioImage from './font/mario.png'

const Spacer = styled.div`
  height: 100px; /* adjust the height as needed */
`;

const Spacer2 = styled.div`
  height: 50px; /* adjust the height as needed */
`;

const Title = styled.h2`
  text-align: center;
  margin-top: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  img {
    height: 1.5rem;
    width: 1.5rem;
  }
`;

function App() {
  return (
    <>
      <Logo />
      <Home />
      <Title>
        <img src={kirbyImage} alt="Kirby icon" />
        Players
      </Title>
      <Spacer2 />
      <Player />
      <Spacer />
      <Title>
        <img src={marioImage} alt="Mario icon" />
        Tournaments
      </Title>
      <Spacer2 />
      <Tournament />
      <Spacer />
    </>
  );
}

export default App;
