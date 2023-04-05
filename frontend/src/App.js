import './App.css';
import React, {useEffect, useState} from 'react';

import Home from './pages/Home'
import Logo from './pages/LogoDisplay'

import Player from './pages/Player';
import Tournament from './pages/Tournament';
import styled from 'styled-components';

const Spacer = styled.div`
  height: 200px; /* adjust the height as needed */
`;

const Spacer2 = styled.div`
  height: 50px; /* adjust the height as needed */
`;

const Title = styled.h2`
  text-align: center;
  margin-top: 2rem;
`;

function App() {
  return (
    <>
      <Logo />
      <Home />
      <Title>Players</Title>
      <Spacer2 />
      <Player />
      <Spacer />
      <Title>Tournaments</Title>
      <Spacer2 />
      <Tournament />
      <Spacer />
    </>
  );
}

export default App;