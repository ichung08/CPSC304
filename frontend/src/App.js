import './App.css';
import React, {useEffect, useState} from 'react';

import Home from './pages/Home'
import Logo from './pages/LogoDisplay'
import SmashCharacters from './pages/SmashCharacters';
import Tournaments from './pages/Tournament';
import GameTournament from './pages/GameTournament';
import Player from './pages/Player';

function App() {
  
  return (
    <>
      <Logo />
      <Home />
      <Player />
    </>
  );

}

export default App;