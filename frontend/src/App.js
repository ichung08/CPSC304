import './App.css';
import React, { useState, useEffect } from 'react';

import Home from './pages/Home';
import Logo from './pages/LogoDisplay';
import Player from './pages/Player';
import Tournament from './pages/Tournament';
import SmashCharacter from './pages/Character';
import Ability from './pages/Abilities';
import styled from 'styled-components';

import kirbyImage from './assets/kirby.png';
import marioImage from './assets/mario.png';
import donkeykongImage from './assets/donkeykong.png';
import yoshiImage from './assets/yoshi.png';
import daisyImage from './assets/daisy.png';
import bowserImage from './assets/bowser.png';
import samusImage from './assets/samus.png';
import zeldaImage from './assets/zelda.png';
import dededeImage from './assets/dedede.png';
import littlemacImage from './assets/littlemac.png';

import GamePlayer from './pages/GamePlayer';
import GamesPlayed from './pages/GamesPlayed';
import Wins from './pages/Wins';
import Teams from './pages/Teams';
import AvgAge from './pages/AvgAge';
import EveryGame from './pages/EveryGame';

const Spacer = styled.div`
  height: 50px; /* adjust the height as needed */
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
  cursor: pointer;
  transition: transform 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    color: #1B1B9E;
    text-shadow: 2px 2px #FED324;
  }

  ${({ active }) =>
    active &&
    `
      background-color: #eee;
      transform: scale(1.1);
    `}
`;


const Section = styled.section`
  margin: 0 10rem;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;


function App() {
  const [showPlayers, setShowPlayers] = useState(false);
  const [showTournaments, setShowTournaments] = useState(false);
  const [showCharacters, setShowCharacters] = useState(false);
  const [showAbilities, setShowAbilities] = useState(false);
  const [showGamePlayers, setShowGamePlayers] = useState(false);
  const [showGamesPlayed, setShowGamesPlayed] = useState(false);
  const [showWins, setShowWins] = useState(false);
  const [showTeams, setShowTeams] = useState(false);
  const [showAvgAge, setShowAvgAge] = useState(false);
  const [showEveryGame, setShowEveryGame] = useState(false);

  return (
    <>
      <LogoWrapper>
        <Logo />
      </LogoWrapper>
      <Home />
      <Title onClick={() => setShowPlayers(!showPlayers)}>
        <img src={kirbyImage} alt="Kirby icon" />
        Players
      </Title>
      <Section>
        {showPlayers && <Player />}
      </Section>
      <Spacer />
      <Title onClick={() => setShowTournaments(!showTournaments)}>
        <img src={marioImage} alt="Mario icon" />
        Tournaments
      </Title>
      <Section>
        {showTournaments && <Tournament />}
      </Section>
      <Spacer />
      <Title onClick={() => setShowCharacters(!showCharacters)}>
        <img src={donkeykongImage} alt="Donkey Kong icon" />
        Characters
      </Title>
      <Section>
        {showCharacters && <SmashCharacter />}
      </Section>
      <Spacer />
      <Title onClick={() => setShowAbilities(!showAbilities)}>
        <img src={yoshiImage} alt="Yoshi icon" />
        Abilities
      </Title>
      <Section>
        {showAbilities && <Ability />}
      </Section>
      <Spacer />
      <Title onClick={() => setShowGamePlayers(!showGamePlayers)}>
        <img src={daisyImage} alt="Daisy icon" />
        Game Player
      </Title>
      <Section>
        {showGamePlayers && <GamePlayer />}
      </Section>
      <Spacer />
      <Title onClick={() => setShowGamesPlayed(!showGamesPlayed)}>
        <img src={bowserImage} alt="Bowser icon" />
        Games Played
      </Title>
      <Section>
        {showGamesPlayed && <GamesPlayed />}
      </Section>
      <Spacer />
      <Title onClick={() => setShowWins(!showWins)}>
        <img src={samusImage} alt="Samus icon" />
        Wins by Attribute
      </Title>
      <Section>
        {showWins && <Wins />}
      </Section>
      <Spacer />
      <Title onClick={() => setShowTeams(!showTeams)}>
        <img src={zeldaImage} alt="Zelda icon" />
        Teams by Attribute
      </Title>
      <Section>
        {showTeams && <Teams />}
      </Section>
      <Spacer />
      <Title onClick={() => setShowAvgAge(!showAvgAge)}>
        <img src={dededeImage} alt="Dedede icon" />
        Average Age by Attribute
      </Title>
      <Section>
        {showAvgAge && <AvgAge />}
      </Section>
      <Spacer />
      <Title onClick={() => setShowEveryGame(!showEveryGame)}>
        <img src={littlemacImage} alt="Little Mac icon" />
        Players who played every game in a tournament
      </Title>
      <Section>
        {showEveryGame && <EveryGame />}
        </Section>
        <Spacer />
    </>
  );
}

export default App;
