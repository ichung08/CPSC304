import './App.css';
import React, {useEffect, useState} from 'react';

import Home from './pages/Home'
import Logo from './pages/LogoDisplay'
import SmashCharacters from './pages/SmashCharacters';
import Tournaments from './pages/Tournament';
import GameTournament from './pages/GameTournament';

function App() {
  const [data, setData] = useState()

  useEffect(() => {
    fetch('/players')
      .then(res => res.json())
      .then(data => setData(data))
  }, [])

  return (
    <>
      <Logo />
      <Home />
      {/* <SmashCharacters />
      <Tournaments />
      <GameTournament /> */}
      <h1>{data}</h1>
    </>
  );

}

export default App;