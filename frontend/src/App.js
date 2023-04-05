import './App.css';
import React, { useState, useEffect } from 'react';

import Home from './pages/Home'
import Logo from './pages/LogoDisplay'

import Player from './pages/Player';
import Tournament from './pages/Tournament';
import SmashCharacter from './pages/Character';
import Ability from './pages/Abilities';
import styled from 'styled-components';

import kirbyImage from './assets/kirby.png';
import marioImage from './assets/mario.png'
import donkeykongImage from './assets/donkeykong.png'
import yoshiImage from './assets/yoshi.png'

const Spacer = styled.div`
  height: 70px; /* adjust the height as needed */
`;

const Spacer2 = styled.div`
  height: 50px; /* adjust the height as needed */
`;

const Title = styled.h2`
  text-align: center;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  img {
    height: 1.5rem;
    width: 1.5rem;
  }
  text-shadow: 3px 3px #ccc;
`;


const Section = styled.section`
  margin: 0 5rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;

function App() {

  return (
    <>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Home />
      <Title>
        <img src={kirbyImage} alt="Kirby icon" />
        Players
      </Title>
      <Section>
        <Player />
      </Section>
      <Spacer />
      <Title>
        <img src={marioImage} alt="Mario icon" />
        Tournaments
      </Title>
      <Spacer2 />
      <Section>
        <Tournament />
      </Section>
      <Spacer />
      <Title>
        <img src={donkeykongImage} alt="Donkey Kong icon" />
        Characters
      </Title>
      <Spacer2 />
      <Section>
        <SmashCharacter />
      </Section>
      <Spacer />
      <Title>
        <img src={yoshiImage} alt="Yoshi icon" />
        Abilities
      </Title>
      <Section>
        <Ability />
      </Section>
    </>
  );
}

export default App;
